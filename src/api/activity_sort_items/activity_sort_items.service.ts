import { Inject, Injectable } from '@nestjs/common';
import {
  CreateActivitySortItemsDto,
  UpdateActivitySortItemsDto,
  ACTIVITY_SORT_ITEMS_PROVIDER,
} from './activity_sort_items.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { ActivitySortItems } from './activity_sort_items.entity';

@Injectable()
export class ActivitySortItemsService extends BaseService<
  ActivitySortItems,
  CreateActivitySortItemsDto,
  UpdateActivitySortItemsDto
> {
  @Inject(ACTIVITY_SORT_ITEMS_PROVIDER) repository: BaseRepo<ActivitySortItems>;
}
