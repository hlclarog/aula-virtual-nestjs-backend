import { Module } from '@nestjs/common';
import { AwsService } from './aws.service';
import { S3ProviderModule } from './providers/s3.provider';

@Module({
  imports: [S3ProviderModule.forRoot()],
  providers: [AwsService],
  exports: [AwsService],
})
export class AwsModule {}
