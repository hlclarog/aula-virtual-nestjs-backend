import { Module } from '@nestjs/common';
import { ActivitySortItemsService } from './activity_sort_items.service';
import { ActivitySortItemsController } from './activity_sort_items.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { ACTIVITY_SORT_ITEMS_PROVIDER } from './activity_sort_items.dto';
import { ActivitySortItems } from './activity_sort_items.entity';
import { SortItemAnswersModule } from '../sort_item_answers/sort_item_answers.module';
import { AwsModule } from '../../aws/aws.module';

@Module({
  imports: [SortItemAnswersModule, AwsModule],
  controllers: [ActivitySortItemsController],
  providers: [
    {
      provide: ACTIVITY_SORT_ITEMS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(ActivitySortItems),
    },
    ActivitySortItemsService,
  ],
  exports: [ACTIVITY_SORT_ITEMS_PROVIDER, ActivitySortItemsService],
})
export class ActivitySortItemsModule {}
