import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../../base/base.service';
import { CourseUsers } from './course-users.entity';
import { BaseRepo } from '../../base/base.repository';
import {
  COURSE_USERS_PROVIDER,
  CreateCourseUsersDto,
  UpdateCourseUsersDto,
} from './course-users.dto';
import {
  SubscribeCourseStudentDto,
  UnSubscribeCourseStudentDto,
} from '../courses/courses.dto';
import { LessonsService } from '../lessons/lessons.service';
import { TypesReasonsPoints } from '../points_user_log/points_user_log.dto';
import { PointsUserLogService } from '../points_user_log/points_user_log.service';
import {
  INFO_TENANCY_PROVIDER,
  InfoTenancyDomain,
} from './../../utils/providers/info-tenancy.module';
import { TenancyConfigService } from '../tenancy_config/tenancy_config.service';
import { ActivityTryUsersService } from '../activity_try_users/activity_try_users.service';
import { LessonScormIntentsService } from '../lesson_scorm_intents/lesson_scorm_intents.service';
import { LessonTryUsersService } from '../lesson_try_users/lesson_try_users.service';

@Injectable()
export class CourseUsersService extends BaseService<
  CourseUsers,
  CreateCourseUsersDto,
  UpdateCourseUsersDto
> {
  @Inject(COURSE_USERS_PROVIDER) repository: BaseRepo<CourseUsers>;

  constructor(
    @Inject(INFO_TENANCY_PROVIDER) private tenancy: InfoTenancyDomain,
    private tenancyConfigService: TenancyConfigService,
    private lessonsService: LessonsService,
    private pointsUserLogService: PointsUserLogService,
    private activityTryUsersService: ActivityTryUsersService,
    private lessonScormIntentsService: LessonScormIntentsService,
    private lessonTryUsersService: LessonTryUsersService,
  ) {
    super();
  }

  async findByCourse(id: number): Promise<CourseUsers[]> {
    const result = await this.repository
      .createQueryBuilder('course_user')
      .select([
        'course_user.course_id',
        'course_user.user_id',
        'course_user.enrollment_status_id',
        'course_user.enrollment_type_id',
        'course_user.begin_date',
        'course_user.end_date',
        'course_user.certificate_file',
        'course_user.certificate_code_validation',
        'course_user.favorite',
        'course_user.score',
        'course_user.downloaded',
        'course_user.active',
        'user.id',
        'user.name',
        'user.lastname',
        'user.last_login',
      ])
      .leftJoin('course_user.user', 'user')
      .where('course_user.course_id = :id', { id })
      .getMany();
    for (let i = 0; i < result.length; i++) {
      const element = result[i];
      const dataprogress = await this.lessonsService.findProgessByCourse(
        [id],
        element.user_id,
      );
      const infoProgress = dataprogress.length > 0 ? dataprogress[0] : {};
      element['progress'] = infoProgress['progress'];
    }
    return result;
  }

  async set(createDto: CreateCourseUsersDto): Promise<any> {
    const founds = await this.repository
      .createQueryBuilder()
      .where('user_id = :user AND course_id = :course', {
        user: `${createDto.user_id}`,
        course: `${createDto.course_id}`,
      })
      .withDeleted()
      .getCount();
    let result;
    if (founds) {
      result = await this.repository
        .createQueryBuilder()
        .update()
        .set({ deleted_at: null })
        .where(
          'user_id = :user AND course_id = :course AND deleted_at is not null',
          {
            user_id: createDto.user_id,
            course_id: createDto.course_id,
          },
        )
        .execute();
    } else {
      result = await this.repository
        .createQueryBuilder()
        .insert()
        .into(CourseUsers)
        .values(createDto)
        .execute();
    }

    return { data: result };
  }

  async subscribe(createDto: SubscribeCourseStudentDto) {
    const match = await this.repository.findOne({
      where: { course_id: createDto.course_id, user_id: createDto.user_id },
      withDeleted: true,
    });
    if (!match) {
      await this.pointsUserLogService.generatePoints(
        createDto.user_id,
        TypesReasonsPoints.COURSE_INIT,
        createDto.course_id,
      );
      return await this.repository.save(createDto);
    } else {
      return await this.repository.update(match.id, {
        deleted_at: null,
        end_date: null,
      });
    }
  }

  async setFavorite(user_id: number, course_id: number, favorite: boolean) {
    return await this.repository.update(
      { course_id, user_id },
      {
        favorite,
      },
    );
  }

  async setScore(user_id: number, course_id: number, score: number) {
    return await this.repository.update(
      { course_id, user_id },
      {
        score,
      },
    );
  }

  async unSubscribe(data: UnSubscribeCourseStudentDto) {
    const config = await this.tenancyConfigService.findOne(this.tenancy.id);
    await this.repository.update(
      {
        course_id: data.course_id,
        user_id: data.user_id,
      },
      { end_date: data.end_date },
    );
    if (config.unenroll_reset) {
      await this.activityTryUsersService.resetProgressUser(
        data.user_id,
        data.course_id,
      );
      await this.lessonScormIntentsService.resetProgressUser(
        data.user_id,
        data.course_id,
      );
      await this.lessonTryUsersService.resetProgressUser(
        data.user_id,
        data.course_id,
      );
      await this.repository.delete({
        course_id: data.course_id,
        user_id: data.user_id,
      });
    } else {
      await this.repository.softDelete({
        user_id: data.user_id,
        course_id: data.course_id,
      });
    }

    return { unroll: true };
  }
}
