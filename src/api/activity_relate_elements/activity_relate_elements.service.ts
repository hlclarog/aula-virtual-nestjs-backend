import { Inject, Injectable } from '@nestjs/common';
import {
  CreateActivityRelateElementsDto,
  UpdateActivityRelateElementsDto,
  ACTIVITY_RELATE_ELEMENTS_PROVIDER,
} from './activity_relate_elements.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { ActivityRelateElements } from './activity_relate_elements.entity';
import { UpdateResult } from 'typeorm';
import { RELATE_ELEMENT_ANSWERS_PROVIDER } from '../relate_element_answers/relate_element_answers.dto';
import { RelateElementAnswers } from '../relate_element_answers/relate_element_answers.entity';
import { RelateElementAnswersService } from '../relate_element_answers/relate_element_answers.service';
import * as shortid from 'shortid';
import { typeFilesAwsNames } from '../../aws/aws.dto';
import { AwsService } from '../../aws/aws.service';

@Injectable()
export class ActivityRelateElementsService extends BaseService<
  ActivityRelateElements,
  CreateActivityRelateElementsDto,
  UpdateActivityRelateElementsDto
> {
  @Inject(ACTIVITY_RELATE_ELEMENTS_PROVIDER)
  repository: BaseRepo<ActivityRelateElements>;
  @Inject(RELATE_ELEMENT_ANSWERS_PROVIDER)
  relate_element_answers: BaseRepo<RelateElementAnswers>;

  constructor(
    private relateElementAnswersService: RelateElementAnswersService,
    private awsService: AwsService,
  ) {
    super();
  }

  async update(
    id: number,
    updateDto: UpdateActivityRelateElementsDto,
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
    await this.relate_element_answers
      .createQueryBuilder()
      .delete()
      .where(
        `activity_relate_element_id = :id AND id not in (${
          ids.length > 0 ? ids.join() : [0].join()
        })`,
        {
          id,
        },
      )
      .execute();

    for (const value of dataUpdate) {
      await this.relate_element_answers.update(value.id, value);
    }

    await this.relate_element_answers.save(
      lesson_activity_detail_answers.filter((f) => f.id === undefined),
    );
    return updateResult;
  }

  async setResourceContent(file) {
    const result = await this.awsService.saveFile({
      file,
      name: shortid.generate(),
      type: typeFilesAwsNames.activity_relate_element,
    });
    return result.Key;
  }

  async isRight(detail_id: number, answer): Promise<boolean> {
    let matches = 0;
    let right = false;
    const listAnswers = await this.relateElementAnswersService.findAllByQuestion(
      detail_id,
    );
    const userAnswers = Object.keys(answer);
    const systemAnswers = {};
    listAnswers.map((ans) => {
      systemAnswers[ans.id] = ans.term;
    });
    if (userAnswers.length == listAnswers.length) {
      for (let i = 0; i < userAnswers.length; i++) {
        const key = userAnswers[i];
        const value = answer[key];
        const correct = systemAnswers[key];
        if (value === correct) {
          matches++;
        }
      }
    }
    if (matches == listAnswers.length) {
      right = true;
    }
    return right;
  }

  async getByDetailId(detail_id: number) {
    return await this.repository
      .createQueryBuilder('activity')
      .select([
        'activity.id',
        'activity.statement',
        'activity.observation',
        'activity.picture',
        'activity.video',
        'activity.audio',
        'activity.resource_content',
        'activity.resource_type_id',
        'answer.id',
        'answer.activity_relate_element_id',
        'answer.term',
        'answer.definition',
      ])
      .leftJoin('activity.relate_element_answers', 'answer')
      .where('activity.id = :detail_id', {
        detail_id,
      })
      .getOne();
  }
}
