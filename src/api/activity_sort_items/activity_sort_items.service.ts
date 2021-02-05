import { Inject, Injectable } from '@nestjs/common';
import {
  CreateActivitySortItemsDto,
  UpdateActivitySortItemsDto,
  ACTIVITY_SORT_ITEMS_PROVIDER,
} from './activity_sort_items.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { ActivitySortItems } from './activity_sort_items.entity';
import { SortItemAnswersService } from '../sort_item_answers/sort_item_answers.service';

@Injectable()
export class ActivitySortItemsService extends BaseService<
  ActivitySortItems,
  CreateActivitySortItemsDto,
  UpdateActivitySortItemsDto
> {
  @Inject(ACTIVITY_SORT_ITEMS_PROVIDER) repository: BaseRepo<ActivitySortItems>;

  constructor(private sortItemAnswersService: SortItemAnswersService) {
    super();
  }

  async isRight(detail_id: number, answer: number[]): Promise<boolean> {
    let matches = 0;
    let right = false;
    const listAnswers = await this.sortItemAnswersService.findAllByQuestion(
      detail_id,
    );
    for (let i = 0; i < listAnswers.length; i++) {
      const elementInQuestion = listAnswers[i].id;
      const elementInAnswer = answer[i];
      if (elementInQuestion == elementInAnswer) {
        matches++;
      }
    }
    if (matches == listAnswers.length) {
      right = true;
    }
    return right;
  }
}
