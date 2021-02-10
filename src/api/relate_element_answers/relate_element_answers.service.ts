import { Inject, Injectable } from '@nestjs/common';
import {
  CreateRelateElementAnswersDto,
  UpdateRelateElementAnswersDto,
  RELATE_ELEMENT_ANSWERS_PROVIDER,
} from './relate_element_answers.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { RelateElementAnswers } from './relate_element_answers.entity';

@Injectable()
export class RelateElementAnswersService extends BaseService<
  RelateElementAnswers,
  CreateRelateElementAnswersDto,
  UpdateRelateElementAnswersDto
> {
  @Inject(RELATE_ELEMENT_ANSWERS_PROVIDER)
  repository: BaseRepo<RelateElementAnswers>;

  async findAllByQuestion(
    question_id: number,
  ): Promise<RelateElementAnswers[]> {
    return await this.repository.find({
      where: {
        activity_relate_element: question_id,
      },
    });
  }
}
