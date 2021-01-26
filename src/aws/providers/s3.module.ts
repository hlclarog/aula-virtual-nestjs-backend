import { DynamicModule, Global, Module } from '@nestjs/common';
import { S3_PROVIDER } from '../aws.dto';
import * as AWS from 'aws-sdk';

@Global()
@Module({})
export class S3Module {
  static forRoot(): DynamicModule {
    const providerS3 = {
      provide: S3_PROVIDER,
      inject: [],
      useFactory: async (): Promise<AWS.S3> => {
        const s3Config = new AWS.S3();
        return s3Config;
      },
    };
    return {
      module: S3Module,
      imports: [],
      providers: [providerS3],
      exports: [providerS3],
    };
  }
}

// @Inject(S3_PROVIDER) private readonly aws_s3: AWS.S3
