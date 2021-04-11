import { Module } from '@nestjs/common';
import { LessonScormsService } from './lesson_scorms.service';
import { LessonScormsController } from './lesson_scorms.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { LESSON_SCORMS_PROVIDER } from './lesson_scorms.dto';
import { LessonScorms } from './lesson_scorms.entity';
import { AwsModule } from './../../aws/aws.module';
import { LessonScormResourcesModule } from '../lesson_scorm_resources/lesson_scorm_resources.module';

@Module({
  imports: [AwsModule, LessonScormResourcesModule],
  controllers: [LessonScormsController],
  providers: [
    {
      provide: LESSON_SCORMS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(LessonScorms),
    },
    LessonScormsService,
  ],
  exports: [LESSON_SCORMS_PROVIDER, LessonScormsService],
})
export class LessonScormsModule {}
