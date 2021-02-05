import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    ActivityTryUsersModule,
    LessonActivitiesModule,
    ActivityMultipleOptionsModule,
    ActivitySortItemsModule,
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
