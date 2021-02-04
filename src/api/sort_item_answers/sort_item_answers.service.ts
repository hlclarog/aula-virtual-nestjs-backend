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
}
