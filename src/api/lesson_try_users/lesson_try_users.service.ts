import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  CreateLessonTryUsersDto,
  LESSON_TRY_USERS_PROVIDER,
  EndLessonTryUsersDto,
} from './lesson_try_users.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { LessonTryUsers } from './lesson_try_users.entity';
import { PointsUserLogService } from '../points_user_log/points_user_log.service';
import {
  PointsGerenerated,
  TypesReasonsPoints,
} from '../points_user_log/points_user_log.dto';
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
  @Inject(LESSON_TRY_USERS_PROVIDER)
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
        'lesson_try_users.course_lesson_id',
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
        'lesson_try_users.course_lesson_id',
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

  async findAllByCourseLessonActivity(
    course_lesson_id: number,
  ): Promise<LessonTryUsers[]> {
    return await this.repository
      .createQueryBuilder('lesson_try_users')
      .select([
        'lesson_try_users.id',
        'lesson_try_users.begin',
        'lesson_try_users.end',
        'lesson_try_users.percent',
        'lesson_try_users.user_id',
        'course_lesson.lesson_id',
        'course_lesson.course_id',
        'lesson.id',
        'lesson.description',
        'lesson.name',
        'user.id',
        'user.name',
      ])
      .leftJoin('lesson_try_users.course_lesson', 'course_lesson')
      .leftJoin('course_lesson.lesson', 'lesson')
      .leftJoin('lesson_try_users.user', 'user')
      .where('course_lesson.id = :id', {
        id: course_lesson_id,
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
      .leftJoin('lesson_try_users.course_lesson', 'course_lesson')
      .where(
        'course_lesson.course_id = :course_id AND lesson_try_users.user_id = user_id',
        {
          user_id,
          course_id,
        },
      )
      .getMany();
  }

  async getActualTry(user_id: number, course_lesson_id: number) {
    return await this.repository.findOne({
      where: {
        user_id,
        course_lesson_id,
      },
      relations: ['course_lesson', 'course_lesson.lesson'],
    });
  }

  async start(createDto: CreateLessonTryUsersDto) {
    let actual = await this.getActualTry(
      createDto.user_id,
      createDto.course_lesson_id,
    );
    if (actual) {
      return actual;
    } else {
      const result = await this.repository.save(createDto);
      actual = await this.getActualTry(
        createDto.user_id,
        createDto.course_lesson_id,
      );
      const points = await this.pointsUserLogService.generatePoints(
        createDto.user_id,
        TypesReasonsPoints.LESSON_INIT,
        actual.course_lesson.course_id,
        createDto.course_lesson_id,
      );
      return { ...result, points_generated: points };
    }
  }

  async end(updateDto: EndLessonTryUsersDto) {
    let points: PointsGerenerated = null;
    const actual = await this.getActualTry(
      updateDto.user_id,
      updateDto.course_lesson_id,
    );
    if (actual) {
      if (!actual.end) {
        let reason = null;
        switch (actual.course_lesson.lesson.lesson_type_id) {
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
          points = await this.pointsUserLogService.generatePoints(
            updateDto.user_id,
            reason,
            actual.course_lesson.course_id,
            updateDto.course_lesson_id,
          );
        }
      }
      const result = await this.repository.update(actual.id, updateDto);
      return { ...result, points: points ? points.generated : null };
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
