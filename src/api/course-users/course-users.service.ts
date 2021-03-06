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

@Injectable()
export class CourseUsersService extends BaseService<
  CourseUsers,
  CreateCourseUsersDto,
  UpdateCourseUsersDto
> {
  @Inject(COURSE_USERS_PROVIDER) repository: BaseRepo<CourseUsers>;

  async findByCourse(id: number): Promise<CourseUsers[]> {
    return await this.repository.find({
      where: { course_id: id },
      relations: ['user', 'enrollment_status', 'enrollment_type', 'course'],
    });
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
    console.log(match);
    if (!match) {
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
    await this.repository.update(
      {
        course_id: data.course_id,
        user_id: data.user_id,
      },
      { end_date: data.end_date },
    );
    const result = await this.repository.softDelete({
      user_id: data.user_id,
      course_id: data.course_id,
    });
    return { data: result };
  }
}
