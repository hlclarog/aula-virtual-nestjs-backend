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
import { UpdateResult } from 'typeorm';
import { MultipleOptionAnswers } from '../multiple_option_answers/multiple_option_answers.entity';
import { MULTIPLE_OPTION_ANSWERS_PROVIDER } from '../multiple_option_answers/multiple_option_answers.dto';
import * as shortid from 'shortid';
import { typeFilesAwsNames } from '../../aws/aws.dto';
import { AwsService } from '../../aws/aws.service';

@Injectable()
export class ActivityMultipleOptionsService extends BaseService<
  ActivityMultipleOptions,
  CreateActivityMultipleOptionsDto,
  UpdateActivityMultipleOptionsDto
> {
  @Inject(ACTIVITY_MULTIPLE_OPTIONS_PROVIDER)
  repository: BaseRepo<ActivityMultipleOptions>;
  @Inject(MULTIPLE_OPTION_ANSWERS_PROVIDER)
  multiple_option_answers: BaseRepo<MultipleOptionAnswers>;

  constructor(
    private multipleOptionAnswersService: MultipleOptionAnswersService,
    private awsService: AwsService,
  ) {
    super();
  }

  async update(
    id: number,
    updateDto: UpdateActivityMultipleOptionsDto,
  ): Promise<UpdateResult> {
    const lesson_activity_detail_answers =
      updateDto.lesson_activity_detail_answers;
    delete updateDto.lesson_activity_detail_answers;
    if (updateDto.resource_content) {
      updateDto.resource_content = await this.setResourceContent(
        updateDto.resource_content,
      );
    }
    const updateResult = await this.repository.update(id, updateDto);

    const dataUpdate = lesson_activity_detail_answers.filter(
      (f) => f.id !== undefined,
    );
    const ids = dataUpdate.map((f) => f.id);
    await this.multiple_option_answers
      .createQueryBuilder()
      .delete()
      .where(
        `activity_multiple_option = :id AND id not in (${
          ids.length > 0 ? ids.join() : [0].join()
        })`,
        {
          id,
        },
      )
      .execute();

    for (const value of dataUpdate) {
      await this.multiple_option_answers.update(value.id, value);
    }

    await this.multiple_option_answers.save(
      lesson_activity_detail_answers.filter((f) => f.id === undefined),
    );
    return updateResult;
  }

  async setResourceContent(file) {
    const result = await this.awsService.saveFile({
      file,
      name: shortid.generate(),
      type: typeFilesAwsNames.activity_multiple_option,
    });
    return result.Key;
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
