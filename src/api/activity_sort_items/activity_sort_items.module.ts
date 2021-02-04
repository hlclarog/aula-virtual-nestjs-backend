import { Module } from '@nestjs/common';
import { ActivitySortItemsService } from './activity_sort_items.service';
import { ActivitySortItemsController } from './activity_sort_items.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { ACTIVITY_SORT_ITEMS_PROVIDER } from './activity_sort_items.dto';
import { ActivitySortItems } from './activity_sort_items.entity';
@Module({
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
