import { Inject, Injectable } from '@nestjs/common';
import {
  CreateLessonActivitiesDto,
  LESSON_ACTIVITIES_PROVIDER,
  UpdateLessonActivitiesDto,
} from './lesson_activities.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { LessonActivities } from './lesson_activities.entity';
import { ACTIVITY_MULTIPLE_OPTIONS_PROVIDER } from '../activity_multiple_options/activity_multiple_options.dto';
import { ActivityMultipleOptions } from '../activity_multiple_options/activity_multiple_options.entity';
import { MultipleOptionAnswers } from '../multiple_option_answers/multiple_option_answers.entity';
import { MULTIPLE_OPTION_ANSWERS_PROVIDER } from '../multiple_option_answers/multiple_option_answers.dto';

export enum EnumActivityType {
  MultipleOptions = 1,
  RelateElements = 2,
  IdentifyWord = 3,
  SortItems = 4,
  CompleteText = 5,
}
@Injectable()
export class LessonActivitiesService extends BaseService<
  LessonActivities,
  CreateLessonActivitiesDto,
  UpdateLessonActivitiesDto
> {
  @Inject(LESSON_ACTIVITIES_PROVIDER) repository: BaseRepo<LessonActivities>;
  @Inject(ACTIVITY_MULTIPLE_OPTIONS_PROVIDER)
  activityMultipleOptions: BaseRepo<ActivityMultipleOptions>;
  @Inject(MULTIPLE_OPTION_ANSWERS_PROVIDER)
  multipleOptionAnswers: BaseRepo<MultipleOptionAnswers>;

  async create(createDto: CreateLessonActivitiesDto) {
    const resultLessonActivity = await this.repository.save(createDto);

    switch (resultLessonActivity.activity_type) {
      case EnumActivityType.MultipleOptions:
        const createMultiplesOptions = await this.activityMultipleOptions
          .createQueryBuilder()
          .insert()
          .into(ActivityMultipleOptions)
          .values({ active: true })
          .execute();
        if (createMultiplesOptions.identifiers[0].id) {
          await this.multipleOptionAnswers
            .createQueryBuilder()
            .insert()
            .into(MultipleOptionAnswers)
            .values({
              active: true,
              activity_multiple_option:
                createMultiplesOptions.identifiers[0].id,
            })
            .execute();
          await this.repository
            .createQueryBuilder()
            .update()
            .set({ detail_id: createMultiplesOptions.identifiers[0].id })
            .where('id = :id', { id: resultLessonActivity.id })
            .execute();

          resultLessonActivity[
            'activity_multiple_options'
          ] = await this.activityMultipleOptions.find({
            relations: ['multiple_option_answers', 'resource_type'],
            where: { id: createMultiplesOptions.identifiers[0].id },
          });
          return resultLessonActivity;
        }
        break;
    }
  }
}
