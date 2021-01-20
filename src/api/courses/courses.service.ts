import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../../base/base.service';
import {
  COURSES_PROVIDER,
  CreateCourseDto,
  UpdateCourseDto,
} from './courses.dto';
import { BaseRepo } from '../../base/base.repository';
import { Courses } from './courses.entity';

@Injectable()
export class CoursesService extends BaseService<
  Courses,
  CreateCourseDto,
  UpdateCourseDto
> {
  @Inject(COURSES_PROVIDER) repository: BaseRepo<Courses>;
}
