import { DynamicModule, Global, Module } from '@nestjs/common';
import { AWS_PROVIDER } from '../aws.dto';
import * as AWS from 'aws-sdk';

@Global()
@Module({})
export class AwsModule {
  static forRoot(): DynamicModule {
    const providerAws = {
      provide: AWS_PROVIDER,
      inject: [],
      useFactory: async (): Promise<AWS.Config> => {
        const myConfig = new AWS.Config();
        myConfig.update({ region: 'us-east-2' });
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
