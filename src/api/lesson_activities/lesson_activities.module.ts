import { Module } from '@nestjs/common';
import { LessonActivitiesService } from './lesson_activities.service';
import { LessonActivitiesController } from './lesson_activities.controller';
import { Connection } from 'typeorm';
import { LessonActivities } from './lesson_activities.entity';
import { LESSON_ACTIVITIES_PROVIDER } from './lesson_activities.dto';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';

@Module({
  controllers: [LessonActivitiesController],
  providers: [
    {
      provide: LESSON_ACTIVITIES_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(LessonActivities),
    },
    LessonActivitiesService,
  ],
})
export class LessonActivitiesModule {}
