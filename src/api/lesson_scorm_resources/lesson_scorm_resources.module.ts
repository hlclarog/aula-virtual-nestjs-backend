import { Module } from '@nestjs/common';
import { LessonScormResourcesService } from './lesson_scorm_resources.service';
import { LessonScormResourcesController } from './lesson_scorm_resources.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { LESSON_SCORM_RESOURCES_PROVIDER } from './lesson_scorm_resources.dto';
import { LessonScormResources } from './lesson_scorm_resources.entity';
import { AwsModule } from './../../aws/aws.module';

@Module({
  imports: [AwsModule],
  controllers: [LessonScormResourcesController],
  providers: [
    {
      provide: LESSON_SCORM_RESOURCES_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(LessonScormResources),
    },
    LessonScormResourcesService,
  ],
  exports: [LESSON_SCORM_RESOURCES_PROVIDER, LessonScormResourcesService],
})
export class LessonScormResourcesModule {}
