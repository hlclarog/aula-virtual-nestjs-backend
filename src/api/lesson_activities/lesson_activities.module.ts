import { Module } from '@nestjs/common';
import { LessonActivitiesService } from './lesson_activities.service';
import { LessonActivitiesController } from './lesson_activities.controller';
import { Connection } from 'typeorm';
import { LessonActivities } from './lesson_activities.entity';
import { LESSON_ACTIVITIES_PROVIDER } from './lesson_activities.dto';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { ActivityMultipleOptionsModule } from '../activity_multiple_options/activity_multiple_options.module';
import { MultipleOptionAnswersModule } from '../multiple_option_answers/multiple_option_answers.module';
import { ActivitySortItemsModule } from '../activity_sort_items/activity_sort_items.module';
import { ActivityCompleteTextsModule } from '../activity_complete_texts/activity_complete_texts.module';
import { ActivityIdentifyWordsModule } from '../activity_identify_words/activity_identify_words.module';
import { ActivityRelateElementsModule } from '../activity_relate_elements/activity_relate_elements.module';

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
  imports: [
    ActivityMultipleOptionsModule,
    MultipleOptionAnswersModule,
    ActivityMultipleOptionsModule,
    ActivitySortItemsModule,
    ActivityRelateElementsModule,
    ActivityCompleteTextsModule,
    ActivityIdentifyWordsModule,
  ],
})
export class LessonActivitiesModule {}
