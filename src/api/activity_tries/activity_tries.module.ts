import { forwardRef, Module } from '@nestjs/common';
import { ActivityTriesService } from './activity_tries.service';
import { ActivityTriesController } from './activity_tries.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { ACTIVITY_TRIES_PROVIDER } from './activity_tries.dto';
import { ActivityTries } from './activity_tries.entity';
import { ActivityTryUsersModule } from '../activity_try_users/activity_try_users.module';
import { LessonActivitiesModule } from '../lesson_activities/lesson_activities.module';
import { ActivityMultipleOptionsModule } from '../activity_multiple_options/activity_multiple_options.module';
import { ActivitySortItemsModule } from '../activity_sort_items/activity_sort_items.module';
import { ActivityRelateElementsModule } from '../activity_relate_elements/activity_relate_elements.module';
import { ActivityCompleteTextsModule } from '../activity_complete_texts/activity_complete_texts.module';
import { ActivityIdentifyWordsModule } from '../activity_identify_words/activity_identify_words.module';
import { PointsUserLogModule } from '../points_user_log/points_user_log.module';
import { LessonsModule } from '../lessons/lessons.module';

@Module({
  imports: [
    forwardRef(() => ActivityTryUsersModule),
    LessonActivitiesModule,
    ActivityMultipleOptionsModule,
    ActivitySortItemsModule,
    ActivityRelateElementsModule,
    ActivityCompleteTextsModule,
    ActivityIdentifyWordsModule,
    PointsUserLogModule,
    LessonsModule,
  ],
  controllers: [ActivityTriesController],
  providers: [
    {
      provide: ACTIVITY_TRIES_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(ActivityTries),
    },
    ActivityTriesService,
  ],
  exports: [ACTIVITY_TRIES_PROVIDER, ActivityTriesService],
})
export class ActivityTriesModule {}
