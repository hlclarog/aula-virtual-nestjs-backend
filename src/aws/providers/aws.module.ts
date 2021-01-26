import { DynamicModule, Global, Module } from '@nestjs/common';
import { AWS_PROVIDER } from '../aws.dto';
import * as AWS from 'aws-sdk';
import { ConfigService } from 'src/config/config.service';

@Global()
@Module({})
export class AwsModule {
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
      module: AwsModule,
      imports: [],
      providers: [providerAws],
      exports: [providerAws],
    };
  }
}

// @Inject(S3_PROVIDER) private readonly aws_s3: AWS.Config
