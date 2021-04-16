import { Inject, Injectable } from '@nestjs/common';
import { CreateProgramUserCourseDto, PROGRAM_USER_COURSE_PROVIDER, UpdateProgramUserCourseDto } from './program_user_course.dto';
import { BaseService } from '../../base/base.service';
import { ProgramUserCourse } from './program_user_course.entity';
import { BaseRepo } from '../../base/base.repository';

@Injectable()
export class ProgramUserCourseService extends BaseService<
  ProgramUserCourse,
  CreateProgramUserCourseDto,
  UpdateProgramUserCourseDto
> {
  @Inject(PROGRAM_USER_COURSE_PROVIDER) repository: BaseRepo<ProgramUserCourse>;
}
