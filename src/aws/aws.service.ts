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
import { extractDatab64, verifyIfBase64 } from './../utils/base64';
import { ConfigService } from './../config/config.service';
import * as AWS from 'aws-sdk';
import * as parser from 'xml2json';
import * as adminzip from 'adm-zip';
import { extname } from 'path';

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
        // const stream = Readable.from(bitmap);
        const uploadParams: AWS.S3.Types.PutObjectRequest = {
          Bucket: this.configService.getAwsBucket(),
          Key: `${this.tenancy.schema}/${type}/${name}.${dataFile.extension}`,
          Body: bitmap,
          ContentEncoding: 'base64',
          ContentType: dataFile.type,
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

  async saveZipScormContent({ file, name, type }: SaveFileAws): Promise<any> {
    return await new Promise(async (resolve, reject) => {
      const verify = verifyIfBase64(file);
      if (verify) {
        const dataFile = await extractDatab64(file);
        if (dataFile.extension == 'zip') {
          try {
            const bitmap = Buffer.from(dataFile.base, 'base64');
            let infoManifest = {};
            const zip = new adminzip(bitmap);
            const zipEntries = zip.getEntries();
            for (let i = 0; i < zipEntries.length; i++) {
              const zipEntry = zipEntries[i];
              if (!zipEntry.isDirectory) {
                const typeContent = extname(zipEntry.entryName);
                if (zipEntry.entryName == 'imsmanifest.xml') {
                  const xml_string = zipEntry.getData().toString('utf-8');
                  const json = JSON.parse(parser.toJson(xml_string));
                  infoManifest = {
                    identifier: json.manifest.identifier,
                    title: json.manifest.organizations.default,
                    index: json.manifest.resources.resource.href,
                  };
                }
                const uploadParams: AWS.S3.Types.PutObjectRequest = {
                  Bucket: this.configService.getAwsBucket(),
                  Key: `${this.tenancy.schema}/${type}/scorm_${name}/${zipEntry.entryName}`,
                  Body: zipEntry.getData(),
                  ContentEncoding: 'base64',
                  ContentType: typeContent,
                };
                await new Promise((resolve) => {
                  this.aws_s3.upload(uploadParams, function (err, data) {
                    if (err) {
                      throw new InternalServerErrorException(err);
                    }
                    if (data) {
                      resolve(data);
                    }
                  });
                });
              }
            }
            resolve({
              Key: `${this.tenancy.schema}/${type}/scorm_${name}`,
              info: infoManifest,
            });
          } catch (error) {
            throw new InternalServerErrorException(error);
          }
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

  async getFile(myKey, ExpireSeconds?: number): Promise<string> {
    return await new Promise((resolve) => {
      const myBucket = this.configService.getAwsBucket();
      const signedUrlExpireSeconds = ExpireSeconds
        ? ExpireSeconds
        : durationFilesUrl.default;
      const url = this.aws_s3.getSignedUrl('getObject', {
        Bucket: myBucket,
        Key: myKey,
        Expires: signedUrlExpireSeconds,
      });
      resolve(url);
    });
  }

  async getMetadata(myKey): Promise<any> {
    return await new Promise(async (resolve) => {
      const myBucket = this.configService.getAwsBucket();
      await this.aws_s3.headObject(
        {
          Bucket: myBucket,
          Key: myKey,
        },
        (err, result) => {
          if (err) {
            console.log(err);
          }
          resolve(result);
        },
      );
    });
  }

  async getScorm(myKey): Promise<string> {
    return await new Promise((resolve, reject) => {
      const myBucket = this.configService.getAwsBucket();
      // const signedUrlExpireSeconds = durationFilesUrl.img_user;
      this.aws_s3.getBucketWebsite(
        {
          Bucket: myBucket,
        },
        (err, data) => {
          if (err) {
            reject(err);
          }
          resolve(JSON.stringify(data));
        },
      );
    });
  }
}
