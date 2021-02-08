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

  async update(
    id: number,
    updateDto: UpdateActivityRelateElementsDto,
  ): Promise<UpdateResult> {
    const lesson_activity_detail_answers =
      updateDto.lesson_activity_detail_answers;
    delete updateDto.lesson_activity_detail_answers;
    const updateResult = await this.repository.update(id, updateDto);

    const dataUpdate = lesson_activity_detail_answers.filter(
      (f) => f.id !== undefined,
    );
    const ids = dataUpdate.map((f) => f.id);
    await this.relate_element_answers
      .createQueryBuilder()
      .delete()
      .where(
        `activity_relate_element = :id AND id not in (${
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
}
