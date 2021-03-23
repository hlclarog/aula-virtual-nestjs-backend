import { Module } from '@nestjs/common';
import { LessonScormDetailsService } from './lesson_scorm_details.service';
import { LessonScormDetailsController } from './lesson_scorm_details.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { LESSON_SCORM_DETAILS_PROVIDER } from './lesson_scorm_details.dto';
import { LessonScormDetails } from './lesson_scorm_details.entity';
import { AwsModule } from './../../aws/aws.module';

@Module({
  imports: [AwsModule],
  controllers: [LessonScormDetailsController],
  providers: [
    {
      provide: LESSON_SCORM_DETAILS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(LessonScormDetails),
    },
    LessonScormDetailsService,
  ],
  exports: [LESSON_SCORM_DETAILS_PROVIDER, LessonScormDetailsService],
})
export class LessonScormDetailsModule {}
