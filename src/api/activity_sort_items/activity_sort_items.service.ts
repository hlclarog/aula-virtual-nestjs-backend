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
import { UpdateResult } from 'typeorm';
import { SORT_ITEM_ANSWERS_PROVIDER } from '../sort_item_answers/sort_item_answers.dto';
import { SortItemAnswers } from '../sort_item_answers/sort_item_answers.entity';
import * as shortid from 'shortid';
import { typeFilesAwsNames } from '../../aws/aws.dto';
import { AwsService } from '../../aws/aws.service';

@Injectable()
export class ActivitySortItemsService extends BaseService<
  ActivitySortItems,
  CreateActivitySortItemsDto,
  UpdateActivitySortItemsDto
> {
  @Inject(ACTIVITY_SORT_ITEMS_PROVIDER) repository: BaseRepo<ActivitySortItems>;
  @Inject(SORT_ITEM_ANSWERS_PROVIDER)
  sort_item_answers: BaseRepo<SortItemAnswers>;

  constructor(
    private sortItemAnswersService: SortItemAnswersService,
    private awsService: AwsService,
  ) {
    super();
  }

  async update(
    id: number,
    updateDto: UpdateActivitySortItemsDto,
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
    await this.sort_item_answers
      .createQueryBuilder()
      .delete()
      .where(
        `activity_sort_item_id = :id AND id not in (${
          ids.length > 0 ? ids.join() : [0].join()
        })`,
        {
          id,
        },
      )
      .execute();

    for (const value of dataUpdate) {
      await this.sort_item_answers.update(value.id, value);
    }

    await this.sort_item_answers.save(
      lesson_activity_detail_answers.filter((f) => f.id === undefined),
    );
    return updateResult;
  }

  async setResourceContent(file) {
    const result = await this.awsService.saveFile({
      file,
      name: shortid.generate(),
      type: typeFilesAwsNames.activity_sort_item,
    });
    return result.Key;
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
        'answer.activity_sort_item_id',
        'answer.description',
        'answer.order',
      ])
      .leftJoin('activity.sort_item_answers', 'answer')
      .where('activity.id = :detail_id', {
        detail_id,
      })
      .getOne();
  }
}
