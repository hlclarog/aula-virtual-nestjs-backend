import { Inject, Injectable } from '@nestjs/common';
import {
  CreateLessonTryUsersDto,
  ACTIVITY_TRY_USERS_PROVIDER,
  EndLessonTryUsersDto,
} from './lesson_try_users.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { LessonTryUsers } from './lesson_try_users.entity';

@Injectable()
export class LessonTryUsersService extends BaseService<
  LessonTryUsers,
  CreateLessonTryUsersDto,
  EndLessonTryUsersDto
> {
  @Inject(ACTIVITY_TRY_USERS_PROVIDER)
  repository: BaseRepo<LessonTryUsers>;

  async findAll(): Promise<LessonTryUsers[]> {
    return await this.repository
      .createQueryBuilder('lesson_try_users')
      .select([
        'lesson_try_users.id',
        'lesson_try_users.begin',
        'lesson_try_users.end',
        'lesson_try_users.percent',
        'lesson_try_users.user_id',
        'lesson_try_users.lesson_id',
        'lesson.id',
        'lesson.description',
        'lesson.name',
        'user.id',
        'user.name',
      ])
      .leftJoin('lesson_try_users.lesson', 'lesson')
      .leftJoin('lesson_try_users.user', 'user')
      .getMany();
  }

  async findOne(id: number): Promise<LessonTryUsers> {
    return await this.repository
      .createQueryBuilder('lesson_try_users')
      .select([
        'lesson_try_users.id',
        'lesson_try_users.begin',
        'lesson_try_users.end',
        'lesson_try_users.percent',
        'lesson_try_users.user_id',
        'lesson_try_users.lesson_id',
        'lesson.id',
        'lesson.description',
        'lesson.name',
        'user.id',
        'user.name',
      ])
      .leftJoin('lesson_try_users.lesson', 'lesson')
      .leftJoin('lesson_try_users.user', 'user')
      .where('lesson_try_users.id = :id', { id })
      .getOne();
  }

  async findAllByLessonActivity(lesson_id: number): Promise<LessonTryUsers[]> {
    return await this.repository
      .createQueryBuilder('lesson_try_users')
      .select([
        'lesson_try_users.id',
        'lesson_try_users.begin',
        'lesson_try_users.end',
        'lesson_try_users.percent',
        'lesson_try_users.user_id',
        'lesson_try_users.lesson_id',
        'lesson.id',
        'lesson.description',
        'lesson.name',
        'user.id',
        'user.name',
      ])
      .leftJoin('lesson_try_users.lesson', 'lesson')
      .leftJoin('lesson_try_users.user', 'user')
      .where('lesson.id = :id', {
        id: lesson_id,
      })
      .orderBy('lesson_try_users.id', 'ASC')
      .getMany();
  }
}
