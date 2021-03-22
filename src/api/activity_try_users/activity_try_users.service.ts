import { Inject, Injectable } from '@nestjs/common';
import {
  CreateActivityTryUsersDto,
  ACTIVITY_TRY_USERS_PROVIDER,
  EndActivityTryUsersDto,
} from './activity_try_users.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { ActivityTryUsers } from './activity_try_users.entity';
import { ACTIVITY_TRIES_PROVIDER } from '../activity_tries/activity_tries.dto';
import { ActivityTries } from '../activity_tries/activity_tries.entity';

@Injectable()
export class ActivityTryUsersService extends BaseService<
  ActivityTryUsers,
  CreateActivityTryUsersDto,
  EndActivityTryUsersDto
> {
  @Inject(ACTIVITY_TRY_USERS_PROVIDER)
  repository: BaseRepo<ActivityTryUsers>;
  @Inject(ACTIVITY_TRIES_PROVIDER)
  repositoryActivityTries: BaseRepo<ActivityTries>;

  async findAll(): Promise<ActivityTryUsers[]> {
    return await this.repository
      .createQueryBuilder('activity_try_users')
      .leftJoinAndSelect(
        'activity_try_users.lesson_activity',
        'lesson_activity',
      )
      .leftJoinAndSelect('activity_try_users.activity_tries', 'activity_tries')
      .orderBy('activity_tries.id', 'ASC')
      .getMany();
  }

  async findAllByLessonActivity(
    lesson_activity_id: number,
  ): Promise<ActivityTryUsers[]> {
    return await this.repository
      .createQueryBuilder('activity_try_users')
      .leftJoinAndSelect(
        'activity_try_users.lesson_activity',
        'lesson_activity',
      )
      .leftJoinAndSelect('activity_try_users.activity_tries', 'activity_tries')
      .where('lesson_activity.id = :id', {
        id: lesson_activity_id,
      })
      .orderBy('activity_try_users.id', 'ASC')
      .addOrderBy('activity_tries.id', 'ASC')
      .getMany();
  }

  async resetProgressUser(user_id) {
    const intents = await this.repository.find({ where: { user_id } });
    for (let i = 0; i < intents.length; i++) {
      const intent = intents[i];
      this.repositoryActivityTries.delete({ activity_try_user_id: intent.id });
    }
    for (let i = 0; i < intents.length; i++) {
      const intent = intents[i];
      this.repository.delete(intent.id);
    }
    return { reset: true };
  }
}
