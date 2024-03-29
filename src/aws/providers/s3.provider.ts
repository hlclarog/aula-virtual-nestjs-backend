import { DynamicModule, Global, Module } from '@nestjs/common';
import { AWS_PROVIDER, S3_PROVIDER } from '../aws.dto';
import * as AWS from 'aws-sdk';
import { AwsProviderModule } from './aws.provider';

@Global()
@Module({})
export class S3ProviderModule {
  static forRoot(): DynamicModule {
    const providerS3 = {
      provide: S3_PROVIDER,
      inject: [AWS_PROVIDER],
      useFactory: async (aws: AWS.Config): Promise<AWS.S3> => {
        const s3Config = new AWS.S3(aws);
        return s3Config;
      },
    };
    return {
      module: S3ProviderModule,
      imports: [AwsProviderModule],
      providers: [providerS3],
      exports: [providerS3],
    };
  }
}

// @Inject(S3_PROVIDER) private readonly aws_s3: AWS.S3
