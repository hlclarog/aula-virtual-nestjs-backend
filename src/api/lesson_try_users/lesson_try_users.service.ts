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
    const actual = await this.getActualTry(
      createDto.user_id,
      createDto.lesson_id,
    );
    if (actual) {
      return actual;
    } else {
      return await this.repository.save(createDto);
    }
  }

  async end(updateDto: EndLessonTryUsersDto) {
    const actual = await this.getActualTry(
      updateDto.user_id,
      updateDto.lesson_id,
    );
    if (actual) {
      if (!actual.end) {
        await this.pointsUserLogService.generatePoints(
          updateDto.user_id,
          TypesReasonsPoints.TEORIC_LESSON_END,
          actual.lesson.course_unit.course_id,
          updateDto.lesson_id,
        );
      }
      return await this.repository.update(actual.id, updateDto);
    } else {
      throw new InternalServerErrorException('LESSON NOT INITIALIZED');
    }
  }
}
