import { Inject, Injectable } from '@nestjs/common';
import {
  CreateMultipleOptionAnswersDto,
  UpdateMultipleOptionAnswersDto,
  MULTIPLE_OPTION_ANSWERS_PROVIDER,
} from './multiple_option_answers.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { MultipleOptionAnswers } from './multiple_option_answers.entity';

@Injectable()
export class MultipleOptionAnswersService extends BaseService<
  MultipleOptionAnswers,
  CreateMultipleOptionAnswersDto,
  UpdateMultipleOptionAnswersDto
> {
  @Inject(MULTIPLE_OPTION_ANSWERS_PROVIDER)
  repository: BaseRepo<MultipleOptionAnswers>;
}
