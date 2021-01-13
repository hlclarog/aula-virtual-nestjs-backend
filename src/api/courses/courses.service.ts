import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../../base/base.service';
import { Course } from './course.entity';
import {
  COURSE_PROVIDER,
  CreateCourseDto,
  UpdateCourseDto,
} from './courses.dto';
import { BaseRepo } from '../../base/base.repository';

@Injectable()
export class CoursesService extends BaseService<
  Course,
  CreateCourseDto,
  UpdateCourseDto
> {
  @Inject(COURSE_PROVIDER) repository: BaseRepo<Course>;
}
