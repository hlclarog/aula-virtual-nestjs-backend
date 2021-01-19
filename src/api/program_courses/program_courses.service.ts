import { Inject, Injectable } from '@nestjs/common';
import {
  CreateProgramCoursesDto,
  UpdateProgramCoursesDto,
  PROGRAM_COURSES_PROVIDER,
} from './program_courses.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { ProgramCourses } from './program_courses.entity';

@Injectable()
export class ProgramCoursesService extends BaseService<
  ProgramCourses,
  CreateProgramCoursesDto,
  UpdateProgramCoursesDto
> {
  @Inject(PROGRAM_COURSES_PROVIDER) repository: BaseRepo<ProgramCourses>;
}
