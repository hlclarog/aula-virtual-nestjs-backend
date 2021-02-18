import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../../base/base.service';
import { CourseUsers } from './course-users.entity';
import { BaseRepo } from '../../base/base.repository';
import {
  COURSE_USERS_PROVIDER,
  CreateCourseUsersDto,
  UpdateCourseUsersDto,
} from './course-users.dto';

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
            user: createDto.user_id,
            course: createDto.course_id,
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
}
