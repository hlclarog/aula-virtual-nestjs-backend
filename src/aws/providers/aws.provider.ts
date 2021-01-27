import { DynamicModule, Global, Module } from '@nestjs/common';
import { AWS_PROVIDER } from '../aws.dto';
import { ConfigService } from './../../config/config.service';
import * as AWS from 'aws-sdk';

@Global()
@Module({})
export class AwsProviderModule {
  static forRoot(): DynamicModule {
    const providerAws = {
      provide: AWS_PROVIDER,
      inject: [ConfigService],
      useFactory: async (config: ConfigService): Promise<AWS.Config> => {
        const myConfig = new AWS.Config({
          credentials: {
            accessKeyId: config.getAwsAccesKey(),
            secretAccessKey: config.getAwsSecretKey(),
          },
          apiVersion: '2006-03-01',
          signatureVersion: 'v4',
          region: 'us-east-2',
        });
        return myConfig;
      },
    };
    return {
      module: AwsProviderModule,
      imports: [],
      providers: [providerAws],
      exports: [providerAws],
    };
  }
}

// @Inject(S3_PROVIDER) private readonly aws_s3: AWS.Config
