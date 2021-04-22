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
import { ACTIVITY_SORT_ITEMS_PROVIDER } from '../activity_sort_items/activity_sort_items.dto';
import { ActivitySortItems } from '../activity_sort_items/activity_sort_items.entity';
import { ACTIVITY_RELATE_ELEMENTS_PROVIDER } from '../activity_relate_elements/activity_relate_elements.dto';
import { ActivityRelateElements } from '../activity_relate_elements/activity_relate_elements.entity';
import { ACTIVITY_COMPLETE_TEXTS_PROVIDER } from '../activity_complete_texts/activity_complete_texts.dto';
import { ActivityCompleteTexts } from '../activity_complete_texts/activity_complete_texts.entity';
import { ActivityIdentifyWords } from '../activity_identify_words/activity_identify_words.entity';
import { ACTIVITY_IDENTIFY_WORDS_PROVIDER } from '../activity_identify_words/activity_identify_words.dto';
import { CONTENT_TYPES_S3 } from '../content_types/content_types.dto';
import { AwsService } from './../../aws/aws.service';

export enum EnumActivityType {
  MultipleOptions = 1,
  SortItems = 2,
  RelateElements = 3,
  IdentifyWord = 4,
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
  @Inject(ACTIVITY_SORT_ITEMS_PROVIDER)
  activitySortItems: BaseRepo<ActivitySortItems>;
  @Inject(ACTIVITY_RELATE_ELEMENTS_PROVIDER)
  activityRelateElements: BaseRepo<ActivityRelateElements>;
  @Inject(ACTIVITY_COMPLETE_TEXTS_PROVIDER)
  activityCompleteTexts: BaseRepo<ActivityCompleteTexts>;
  @Inject(ACTIVITY_IDENTIFY_WORDS_PROVIDER)
  activityIdentifyWords: BaseRepo<ActivityIdentifyWords>;

  constructor(private awsService: AwsService) {
    super();
  }

  async findOne(id: number): Promise<LessonActivities> {
    return this.repository.findOneOrFail(id, {
      relations: ['lesson'],
    });
  }

  async create(createDto: CreateLessonActivitiesDto) {
    const resultLessonActivity = await this.repository.save(createDto);

    switch (resultLessonActivity.activity_type_id) {
      case EnumActivityType.MultipleOptions:
        await this.multipleOptions(resultLessonActivity);
        break;
      case EnumActivityType.SortItems:
        await this.sortItems(resultLessonActivity);
        break;
      case EnumActivityType.RelateElements:
        await this.relateElements(resultLessonActivity);
        break;
      case EnumActivityType.IdentifyWord:
        await this.identifyWord(resultLessonActivity);
        break;
      case EnumActivityType.CompleteText:
        await this.completeText(resultLessonActivity);
        break;
    }

    return resultLessonActivity;
  }

  async multipleOptions(
    resultLessonActivity: CreateLessonActivitiesDto & LessonActivities,
  ) {
    const createMultiplesOptions = await this.activityMultipleOptions
      .createQueryBuilder()
      .insert()
      .into(ActivityMultipleOptions)
      .values({ active: true })
      .execute();
    if (createMultiplesOptions.identifiers[0].id) {
      await this.repository
        .createQueryBuilder()
        .update()
        .set({ detail_id: createMultiplesOptions.identifiers[0].id })
        .where('id = :id', { id: resultLessonActivity.id })
        .execute();

      resultLessonActivity[
        'lesson_activity_detail'
      ] = await this.activityMultipleOptions.findOne({
        relations: ['multiple_option_answers', 'resource_type'],
        where: { id: createMultiplesOptions.identifiers[0].id },
      });
      return resultLessonActivity;
    }
  }

  async sortItems(
    resultLessonActivity: CreateLessonActivitiesDto & LessonActivities,
  ) {
    const createSortItems = await this.activitySortItems
      .createQueryBuilder()
      .insert()
      .into(ActivitySortItems)
      .values({ active: true })
      .execute();
    if (createSortItems.identifiers[0].id) {
      await this.repository
        .createQueryBuilder()
        .update()
        .set({ detail_id: createSortItems.identifiers[0].id })
        .where('id = :id', { id: resultLessonActivity.id })
        .execute();

      resultLessonActivity[
        'lesson_activity_detail'
      ] = await this.activitySortItems.findOne({
        relations: ['sort_item_answers', 'resource_type'],
        where: { id: createSortItems.identifiers[0].id },
      });
      return resultLessonActivity;
    }
  }

  async relateElements(
    resultLessonActivity: CreateLessonActivitiesDto & LessonActivities,
  ) {
    const createRelateElements = await this.activityRelateElements
      .createQueryBuilder()
      .insert()
      .into(ActivityRelateElements)
      .values({ active: true })
      .execute();
    if (createRelateElements.identifiers[0].id) {
      await this.repository
        .createQueryBuilder()
        .update()
        .set({ detail_id: createRelateElements.identifiers[0].id })
        .where('id = :id', { id: resultLessonActivity.id })
        .execute();

      resultLessonActivity[
        'lesson_activity_detail'
      ] = await this.activityRelateElements.findOne({
        relations: ['relate_element_answers', 'resource_type'],
        where: { id: createRelateElements.identifiers[0].id },
      });
      return resultLessonActivity;
    }
  }

  async identifyWord(
    resultLessonActivity: CreateLessonActivitiesDto & LessonActivities,
  ) {
    const createIdentifyWords = await this.activityIdentifyWords
      .createQueryBuilder()
      .insert()
      .into(ActivityIdentifyWords)
      .values({ active: true })
      .execute();
    if (createIdentifyWords.identifiers[0].id) {
      await this.repository
        .createQueryBuilder()
        .update()
        .set({ detail_id: createIdentifyWords.identifiers[0].id })
        .where('id = :id', { id: resultLessonActivity.id })
        .execute();

      resultLessonActivity[
        'lesson_activity_detail'
      ] = await this.activityIdentifyWords.findOne({
        relations: ['resource_type'],
        where: { id: createIdentifyWords.identifiers[0].id },
      });
      return resultLessonActivity;
    }
  }

  async completeText(
    resultLessonActivity: CreateLessonActivitiesDto & LessonActivities,
  ) {
    const createCompleteTexts = await this.activityCompleteTexts
      .createQueryBuilder()
      .insert()
      .into(ActivityCompleteTexts)
      .values({ active: true })
      .execute();
    if (createCompleteTexts.identifiers[0].id) {
      await this.repository
        .createQueryBuilder()
        .update()
        .set({ detail_id: createCompleteTexts.identifiers[0].id })
        .where('id = :id', { id: resultLessonActivity.id })
        .execute();

      resultLessonActivity[
        'lesson_activity_detail'
      ] = await this.activityCompleteTexts.findOne({
        relations: ['resource_type'],
        where: { id: createCompleteTexts.identifiers[0].id },
      });
      return resultLessonActivity;
    }
  }

  async findAllByLesson(lesson_id: number): Promise<LessonActivities[]> {
    const resultLessonActivities = await this.repository.find({
      where: { lesson_id },
      relations: ['activity_type'],
    });

    for (const f of resultLessonActivities) {
      switch (f.activity_type_id) {
        case EnumActivityType.MultipleOptions:
          const list = await this.activityMultipleOptions.findOne({
            where: { id: f.detail_id },
            relations: ['multiple_option_answers'],
          });
          list['multiple'] =
            list.multiple_option_answers.filter((a) => a.right).length > 1;
          f['lesson_activity_detail'] = list;
          break;
        case EnumActivityType.SortItems:
          f['lesson_activity_detail'] = await this.activitySortItems.findOne({
            where: { id: f.detail_id },
            relations: ['sort_item_answers'],
          });
          break;
        case EnumActivityType.RelateElements:
          f[
            'lesson_activity_detail'
          ] = await this.activityRelateElements.findOne({
            where: { id: f.detail_id },
            relations: ['relate_element_answers'],
          });
          break;
        case EnumActivityType.IdentifyWord:
          f[
            'lesson_activity_detail'
          ] = await this.activityIdentifyWords.findOne({
            id: f.detail_id,
          });
          break;
        case EnumActivityType.CompleteText:
          f[
            'lesson_activity_detail'
          ] = await this.activityCompleteTexts.findOne({
            id: f.detail_id,
          });
          break;
      }

      if (
        f['lesson_activity_detail'].resource_content &&
        CONTENT_TYPES_S3.indexOf(
          f['lesson_activity_detail'].resource_type_id,
        ) >= 0
      ) {
        f[
          'lesson_activity_detail'
        ].resource_content = await this.awsService.getFile(
          f['lesson_activity_detail'].resource_content,
        );
      }
    }

    return resultLessonActivities;
  }

  async findStatisticsIntents(course_id: number) {
    const result = await this.repository
      .createQueryBuilder('lesson_activity')
      .select([
        'lesson_activity.id',
        'lesson_activity.activity_type_id',
        'activity_type.id',
        'activity_type.description',
        'lesson.id',
        'lesson.name',
        'lesson.description',
      ])
      .addSelect('COUNT(activity_try.id)', 'intents_success')
      .addSelect('COUNT(activity_try_fail.id)', 'intents_failed')
      .innerJoin('lesson_activity.lesson', 'lesson')
      .innerJoin('lesson_activity.activity_type', 'activity_type')
      .innerJoin('lesson.course_lessons', 'course_lesson')
      .innerJoin('course_lesson.course', 'course')
      .leftJoin('lesson_activity.activity_try_users', 'activity_try_user')
      .leftJoin(
        'activity_try_user.activity_tries',
        'activity_try',
        'activity_try.passed = true and activity_try.activity_try_user_id = activity_try_user.id',
      )
      .leftJoin(
        'activity_try_user.activity_tries',
        'activity_try_fail',
        'activity_try_fail.passed = false and activity_try_fail.activity_try_user_id = activity_try_user.id',
      )
      .where(`course_lesson.course_id = :course_id`, { course_id })
      .orderBy('lesson.name', 'ASC')
      .addOrderBy('activity_type.description', 'ASC')
      .groupBy('lesson_activity.id')
      .addGroupBy('lesson_activity.activity_type_id')
      .addGroupBy('activity_type.id')
      .addGroupBy('activity_type.description')
      .addGroupBy('lesson.id')
      .addGroupBy('lesson.name')
      .addGroupBy('lesson.description')
      .getRawMany();

    for (let i = 0; i < result.length; i++) {
      const element = result[i];
      element.intents_success = Number(element.intents_success);
      element.intents_failed = Number(element.intents_failed);
      element.intents_total = element.intents_success + element.intents_failed;
      element.percentage_failed =
        (element.intents_total > 0
          ? Math.round(element.intents_failed / element.intents_total)
          : 1) * 100;
    }
    return result;
  }
}
