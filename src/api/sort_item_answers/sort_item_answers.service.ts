import { Inject, Injectable } from '@nestjs/common';
import {
  CreateSortItemAnswersDto,
  UpdateSortItemAnswersDto,
  SORT_ITEM_ANSWERS_PROVIDER,
} from './sort_item_answers.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { SortItemAnswers } from './sort_item_answers.entity';

@Injectable()
export class SortItemAnswersService extends BaseService<
  SortItemAnswers,
  CreateSortItemAnswersDto,
  UpdateSortItemAnswersDto
> {
  @Inject(SORT_ITEM_ANSWERS_PROVIDER)
  repository: BaseRepo<SortItemAnswers>;

  async findAllByQuestion(question_id: number): Promise<SortItemAnswers[]> {
    return await this.repository.find({
      where: {
        activity_sort_item_id: question_id,
      },
      order: {
        order: 'ASC',
      },
    });
  }
}
