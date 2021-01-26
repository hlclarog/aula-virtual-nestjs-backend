import { Body, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import { PermissionsGuard } from '../../utils/guards/permissions.guard';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { INSTANCE_PROCESS_QUEUE } from './../../queues/instance_process/instance_process.dto';
import { S3_PROVIDER } from 'src/aws/aws.dto';
import * as AWS from 'aws-sdk';

@UseGuards(PermissionsGuard)
@ControllerApi({ name: 'test' })
export class TestController {
  constructor(
    @InjectQueue(INSTANCE_PROCESS_QUEUE)
    private readonly instanceProcessQueue: Queue,
    @Inject(S3_PROVIDER) private readonly aws_s3: AWS.S3,
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
          console.log('Error', err);
          reject(err);
        } else {
          resolve(data.Buckets);
        }
      });
    });
  }
}
