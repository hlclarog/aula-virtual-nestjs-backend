import { Module } from '@nestjs/common';
import { ActivityCompleteTextsService } from './activity_complete_texts.service';
import { ActivityCompleteTextsController } from './activity_complete_texts.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { ACTIVITY_COMPLETE_TEXTS_PROVIDER } from './activity_complete_texts.dto';
import { ActivityCompleteTexts } from './activity_complete_texts.entity';
import { AwsModule } from '../../aws/aws.module';

@Module({
  controllers: [ActivityCompleteTextsController],
  imports: [AwsModule],
  providers: [
    {
      provide: ACTIVITY_COMPLETE_TEXTS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(ActivityCompleteTexts),
    },
    ActivityCompleteTextsService,
  ],
  exports: [ACTIVITY_COMPLETE_TEXTS_PROVIDER, ActivityCompleteTextsService],
})
export class ActivityCompleteTextsModule {}
