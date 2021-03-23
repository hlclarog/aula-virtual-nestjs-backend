import { Module } from '@nestjs/common';
import { LessonScormIntentsService } from './lesson_scorm_intents.service';
import { LessonScormIntentsController } from './lesson_scorm_intents.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { LESSON_SCORM_INTENTS_PROVIDER } from './lesson_scorm_intents.dto';
import { LessonScormIntents } from './lesson_scorm_intents.entity';
import { AwsModule } from './../../aws/aws.module';
import { LessonScormDetailsModule } from '../lesson_scorm_details/lesson_scorm_details.module';

@Module({
  imports: [AwsModule, LessonScormDetailsModule],
  controllers: [LessonScormIntentsController],
  providers: [
    {
      provide: LESSON_SCORM_INTENTS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(LessonScormIntents),
    },
    LessonScormIntentsService,
  ],
  exports: [LESSON_SCORM_INTENTS_PROVIDER, LessonScormIntentsService],
})
export class LessonScormIntentsModule {}
