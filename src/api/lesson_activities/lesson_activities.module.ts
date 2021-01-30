import { Module } from '@nestjs/common';
import { LessonActivitiesService } from './lesson_activities.service';
import { LessonActivitiesController } from './lesson_activities.controller';
import { Connection } from 'typeorm';
import { LessonActivities } from './lesson_activities.entity';
import { LESSON_ACTIVITIES_PROVIDER } from './lesson_activities.dto';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { ActivityMultipleOptionsModule } from '../activity_multiple_options/activity_multiple_options.module';
import { MultipleOptionAnswersModule } from '../multiple_option_answers/multiple_option_answers.module';

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
  imports: [ActivityMultipleOptionsModule, MultipleOptionAnswersModule],
})
export class LessonActivitiesModule {}
