import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  CreateLessonTryUsersDto,
  ACTIVITY_TRY_USERS_PROVIDER,
  EndLessonTryUsersDto,
} from './lesson_try_users.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { LessonTryUsers } from './lesson_try_users.entity';
import { PointsUserLogService } from '../points_user_log/points_user_log.service';
import { TypesReasonsPoints } from '../points_user_log/points_user_log.dto';
import { TypesLesson } from '../lesson_types/lesson_types.dto';

@Injectable()
export class LessonTryUsersService extends BaseService<
  LessonTryUsers,
  CreateLessonTryUsersDto,
  EndLessonTryUsersDto
> {
  constructor(private pointsUserLogService: PointsUserLogService) {
    super();
  }
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

  async findAllByCourseForUser(
    user_id: number,
    course_id: number,
  ): Promise<LessonTryUsers[]> {
    return await this.repository
      .createQueryBuilder('lesson_try_users')
      .leftJoin('lesson_try_users.lesson', 'lesson')
      .leftJoin('lesson.course_unit', 'course_unit')
      .where(
        'course_unit.course_id = :course_id AND lesson_try_users.user_id = user_id',
        {
          user_id,
          course_id,
        },
      )
      .getMany();
  }

  async getActualTry(user_id: number, lesson_id: number) {
    return await this.repository.findOne({
      where: {
        user_id,
        lesson_id,
      },
      relations: ['lesson', 'lesson.course_unit'],
    });
  }

  async start(createDto: CreateLessonTryUsersDto) {
    let actual = await this.getActualTry(
      createDto.user_id,
      createDto.lesson_id,
    );
    if (actual) {
      return actual;
    } else {
      const result = await this.repository.save(createDto);
      actual = await this.getActualTry(createDto.user_id, createDto.lesson_id);
      await this.pointsUserLogService.generatePoints(
        createDto.user_id,
        TypesReasonsPoints.LESSON_INIT,
        actual.lesson.course_unit.course_id,
        createDto.lesson_id,
      );
      return result;
    }
  }

  async end(updateDto: EndLessonTryUsersDto) {
    const actual = await this.getActualTry(
      updateDto.user_id,
      updateDto.lesson_id,
    );
    if (actual) {
      if (!actual.end) {
        let reason = null;
        switch (actual.lesson.lesson_type_id) {
          case TypesLesson.TEORIC:
            reason = TypesReasonsPoints.TEORIC_LESSON_END;
            break;
          case TypesLesson.PRACTICE:
            reason = TypesReasonsPoints.PRACTICE_LESSON_END;
            break;
          case TypesLesson.FORUM:
            reason = TypesReasonsPoints.FORUM_LESSON_END;
            break;
        }
        if (reason) {
          await this.pointsUserLogService.generatePoints(
            updateDto.user_id,
            reason,
            actual.lesson.course_unit.course_id,
            updateDto.lesson_id,
          );
        }
      }
      return await this.repository.update(actual.id, updateDto);
    } else {
      throw new InternalServerErrorException('LESSON NOT INITIALIZED');
    }
  }

  async resetProgressUser(user_id: number, course_id: number) {
    const intents = await this.findAllByCourseForUser(user_id, course_id);
    for (let i = 0; i < intents.length; i++) {
      const intent = intents[i];
      await this.repository.delete(intent.id);
    }
    return { reset: true };
  }
}
