import { Inject, Injectable } from '@nestjs/common';
import {
  CreateActivityMultipleOptionsDto,
  UpdateActivityMultipleOptionsDto,
  ACTIVITY_MULTIPLE_OPTIONS_PROVIDER,
} from './activity_multiple_options.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { ActivityMultipleOptions } from './activity_multiple_options.entity';
import { MultipleOptionAnswersService } from '../multiple_option_answers/multiple_option_answers.service';

@Injectable()
export class ActivityMultipleOptionsService extends BaseService<
  ActivityMultipleOptions,
  CreateActivityMultipleOptionsDto,
  UpdateActivityMultipleOptionsDto
> {
  @Inject(ACTIVITY_MULTIPLE_OPTIONS_PROVIDER)
  repository: BaseRepo<ActivityMultipleOptions>;

  constructor(
    private multipleOptionAnswersService: MultipleOptionAnswersService,
  ) {
    super();
  }

  async isRight(detail_id: number, answer: number): Promise<boolean> {
    let right = false;
    const listAnswers = await this.multipleOptionAnswersService.findAllByQuestion(
      detail_id,
    );
    for (let i = 0; i < listAnswers.length; i++) {
      const element = listAnswers[i];
      if (element.id == answer && element.right) {
        right = true;
      }
    }
    return right;
  }
}
