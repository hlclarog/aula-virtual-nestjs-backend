import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../../base/base.service';
import { CourseUsers } from './course-users.entity';
import { CreateCourseDto, UpdateCourseDto } from '../courses/courses.dto';
import { BaseRepo } from '../../base/base.repository';
import { COURSE_USERS_PROVIDER } from './course-users.dto';

@Injectable()
export class CourseUsersService extends BaseService<
  CourseUsers,
  CreateCourseDto,
  UpdateCourseDto
> {
  @Inject(COURSE_USERS_PROVIDER) repository: BaseRepo<CourseUsers>;
}
