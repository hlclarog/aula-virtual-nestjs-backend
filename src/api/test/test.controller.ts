import { Body, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import { PermissionsGuard } from '../../utils/guards/permissions.guard';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { INSTANCE_PROCESS_QUEUE } from './../../queues/instance_process/instance_process.dto';
import { S3_PROVIDER, typeFilesAwsNames } from './../../aws/aws.dto';
import * as AWS from 'aws-sdk';
import * as fs from 'fs';
import { basename } from 'path';
import { AwsService } from './../../aws/aws.service';

@UseGuards(PermissionsGuard)
@ControllerApi({ name: 'test' })
export class TestController {
  constructor(
    @InjectQueue(INSTANCE_PROCESS_QUEUE)
    private readonly instanceProcessQueue: Queue,
    @Inject(S3_PROVIDER) private readonly aws_s3: AWS.S3,
    private awsService: AwsService,
  ) {}

  @Post('queue_tenancy')
  // @RequirePermissions([TEST_PERMISSIONS.LIST])
  public async get(@Body() data: any) {
    await this.instanceProcessQueue.add('create', data);
    return { data: true };
  }

  @Get('buckets')
  public async listBuckets() {
    return await new Promise((resolve, reject) => {
      this.aws_s3.listBuckets((err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve({ data: data.Buckets });
        }
      });
    });
  }

  @Get('get_file')
  public async getFile() {
    return await new Promise((resolve) => {
      const myBucket = 'mangusdev';
      const myKey = 'testFile.txt';
      const signedUrlExpireSeconds = 60 * 5;

      const url = this.aws_s3.getSignedUrl('getObject', {
        Bucket: myBucket,
        Key: myKey,
        Expires: signedUrlExpireSeconds,
      });
      resolve({ data: url });
    });
  }

  @Post('setfiletoBucket')
  async setFile() {
    const file = '/Users/mathiwsmontropez/Desktop/testFile.txt';
    const uploadParams: AWS.S3.Types.PutObjectRequest = {
      Bucket: 'mangusdev',
      Key: '',
      Body: '',
    };
    const fileStream = fs.createReadStream(file);
    uploadParams.Body = fileStream;
    uploadParams.Key = basename(file);
    return await new Promise((resolve, reject) => {
      this.aws_s3.upload(uploadParams, function (err, data) {
        if (err) {
          reject(err);
        }
        if (data) {
          resolve({ data: data.Location });
        }
      });
    });
  }

  @Post('save_file')
  async saveFile(@Body() body) {
    const result = await this.awsService.saveFile({
      ...body,
      type: typeFilesAwsNames.users,
    });
    return result;
  }
}
