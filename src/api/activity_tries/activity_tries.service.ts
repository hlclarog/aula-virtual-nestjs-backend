import { Inject, Injectable } from '@nestjs/common';
import {
  CreateIntentUserDto,
  ACTIVITY_TRIES_PROVIDER,
} from './activity_tries.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { ActivityTries } from './activity_tries.entity';
import { ACTIVITY_TRY_USERS_PROVIDER } from '../activity_try_users/activity_try_users.dto';
import { ActivityTryUsers } from '../activity_try_users/activity_try_users.entity';
import {
  INFO_USER_PROVIDER,
  InfoUserProvider,
} from './../../utils/providers/info-user.module';
import { ActivityTryUsersService } from '../activity_try_users/activity_try_users.service';
import { LessonActivitiesService } from '../lesson_activities/lesson_activities.service';
import { ActivityMultipleOptionsService } from '../activity_multiple_options/activity_multiple_options.service';
import { ActivitySortItemsService } from '../activity_sort_items/activity_sort_items.service';
import { ActivityRelateElementsService } from '../activity_relate_elements/activity_relate_elements.service';
import { ActivityCompleteTextsService } from '../activity_complete_texts/activity_complete_texts.service';
import { ActivityIdentifyWordsService } from '../activity_identify_words/activity_identify_words.service';

@Injectable()
export class ActivityTriesService extends BaseService<
  ActivityTries,
  CreateIntentUserDto,
  null
> {
  @Inject(ACTIVITY_TRIES_PROVIDER)
  repository: BaseRepo<ActivityTries>;
  @Inject(ACTIVITY_TRY_USERS_PROVIDER)
  repositoryTryUsers: BaseRepo<ActivityTryUsers>;
  @Inject(INFO_USER_PROVIDER) private infoUser: InfoUserProvider;

  constructor(
    private activityTryUsersService: ActivityTryUsersService,
    private lessonActivitiesService: LessonActivitiesService,
    private activityMultipleOptionsService: ActivityMultipleOptionsService,
    private activitySortItemsService: ActivitySortItemsService,
    private activityRelateElementsService: ActivityRelateElementsService,
    private activityCompleteTextsService: ActivityCompleteTextsService,
    private activityIdentifyWordsService: ActivityIdentifyWordsService,
  ) {
    super();
  }

  async findAllByLessonActivity(
    lesson_activity_id: number,
  ): Promise<ActivityTries[]> {
    return await this.repository
      .createQueryBuilder('activity_tries')
      .leftJoinAndSelect(
        'activity_tries.activity_try_user',
        'activity_try_user',
      )
      .leftJoinAndSelect('activity_try_user.lesson_activity', 'lesson_activity')
      .where('lesson_activity.id = :id', {
        id: lesson_activity_id,
      })
      .orderBy('activity_tries.id', 'ASC')
      .getMany();
  }

  async create(createDto: CreateIntentUserDto): Promise<any> {
    let passed = false;
    let activity_try_user = await this.repositoryTryUsers.findOne({
      lesson_activity_id: createDto.lesson_activity_id,
      user_id: this.infoUser.id,
    });
    const lesson_activity = await this.lessonActivitiesService.findOne(
      createDto.lesson_activity_id,
    );
    switch (lesson_activity.activity_type_id) {
      case 1:
        const answer_multiple = Number(JSON.parse(createDto.answer)[0]);
        passed = await this.activityMultipleOptionsService.isRight(
          lesson_activity.detail_id,
          answer_multiple,
        );
        break;
      case 2:
        const answer_order = JSON.parse(createDto.answer).map((r) => Number(r));
        passed = await this.activitySortItemsService.isRight(
          lesson_activity.detail_id,
          answer_order,
        );
        break;
      case 3:
        const answer_relate = JSON.parse(createDto.answer);
        passed = await this.activityRelateElementsService.isRight(
          lesson_activity.detail_id,
          answer_relate,
        );
        break;
      case 4:
        const answer_identify = JSON.parse(createDto.answer)[0];
        passed = await this.activityIdentifyWordsService.isRight(
          lesson_activity.detail_id,
          answer_identify,
        );
        break;
      case 5:
        const answer_complete = JSON.parse(createDto.answer);
        passed = await this.activityCompleteTextsService.isRight(
          lesson_activity.detail_id,
          answer_complete,
        );
        break;
    }
    if (!activity_try_user) {
      activity_try_user = await this.activityTryUsersService.create({
        lesson_activity_id: createDto.lesson_activity_id,
        user_id: this.infoUser.id,
        begin: createDto.date,
        end: passed ? createDto.date : null,
        active: true,
      });
    } else if (activity_try_user.id && passed && !activity_try_user.end) {
      await this.activityTryUsersService.update(activity_try_user.id, {
        end: createDto.date,
      });
    }
    if (!activity_try_user.end) {
      const register: Partial<ActivityTries> = {
        passed,
        answer: createDto.answer,
        date: createDto.date,
        activity_try_user_id: activity_try_user.id,
        active: true,
      };
      return await this.repository.save(register);
    } else {
      return this.repository.findOne({
        passed: true,
        activity_try_user_id: activity_try_user.id,
      });
    }
  }
}
