import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  InfoTenancyDomain,
  INFO_TENANCY_PROVIDER,
} from './../utils/providers/info-tenancy.module';
import { durationFilesUrl, S3_PROVIDER, SaveFileAws } from './aws.dto';
import { Readable } from 'stream';
import { extractDatab64, verifyIfBase64 } from './../utils/base64';
import { ConfigService } from './../config/config.service';
import * as unzipper from 'unzipper';
import * as AWS from 'aws-sdk';
import * as fs from 'fs';
import * as etl from 'etl';

@Injectable()
export class AwsService {
  constructor(
    private configService: ConfigService,
    @Inject(S3_PROVIDER) private readonly aws_s3: AWS.S3,
    @Inject(INFO_TENANCY_PROVIDER) private tenancy: InfoTenancyDomain,
  ) {}

  async saveFile({
    file,
    name,
    type,
  }: SaveFileAws): Promise<Partial<AWS.S3.ManagedUpload.SendData>> {
    return await new Promise(async (resolve) => {
      const verify = verifyIfBase64(file);
      if (verify) {
        const dataFile = await extractDatab64(file);
        const bitmap = Buffer.from(dataFile.base, 'base64');
        const stream = Readable.from(bitmap);
        const uploadParams: AWS.S3.Types.PutObjectRequest = {
          Bucket: this.configService.getAwsBucket(),
          Key: `${this.tenancy.schema}/${type}/${name}.${dataFile.extension}`,
          Body: stream,
        };
        this.aws_s3.upload(uploadParams, function (err, data) {
          if (err) {
            throw new InternalServerErrorException(err);
          }
          if (data) {
            resolve(data);
          }
        });
      } else {
        const info: Partial<AWS.S3.ManagedUpload.SendData> = {};
        info.Key = file.length > 250 ? null : file;
        resolve(info);
      }
    });
  }

  async saveZipContent({
    file,
    name,
    type,
  }: SaveFileAws): Promise<Partial<AWS.S3.ManagedUpload.SendData>> {
    return await new Promise(async (resolve) => {
      const verify = verifyIfBase64(file);
      if (verify) {
        const dataFile = await extractDatab64(file);
        if (dataFile.extension == 'zip') {
          const dataFile = await extractDatab64(file);
          const bitmap = Buffer.from(dataFile.base, 'base64');
          const stream = Readable.from(bitmap);
          stream.pipe(unzipper.Parse()).pipe(
            etl.map(async (entry) => {
              console.log(entry.path);
              if (entry.path) {
                const content = await entry.buffer();
                const stream = Readable.from(content);
                const uploadParams: AWS.S3.Types.PutObjectRequest = {
                  Bucket: this.configService.getAwsBucket(),
                  Key: `${this.tenancy.schema}/${type}/${name}/${entry.path}`,
                  Body: stream,
                };
                this.aws_s3.upload(uploadParams, function (err, data) {
                  if (err) {
                    throw new InternalServerErrorException(err);
                  }
                  if (data) {
                    console.log(data);
                  }
                });
              } else {
                entry.autodrain();
              }
            }),
          );
          resolve({ Key: `${this.tenancy.schema}/${type}/${name}` });
        } else {
          resolve({ Key: '' });
        }
      } else {
        const info: Partial<AWS.S3.ManagedUpload.SendData> = {};
        info.Key = file.length > 250 ? null : file;
        resolve(info);
      }
    });
  }

  async getFile(myKey): Promise<string> {
    return await new Promise((resolve) => {
      const myBucket = this.configService.getAwsBucket();
      const signedUrlExpireSeconds = durationFilesUrl.img_user;
      const url = this.aws_s3.getSignedUrl('getObject', {
        Bucket: myBucket,
        Key: myKey,
        Expires: signedUrlExpireSeconds,
      });
      resolve(url);
    });
  }
}
