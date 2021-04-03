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

  async findOne(id: number): Promise<ProgramCourses> {
    return this.repository
      .createQueryBuilder('program_courses')
      .select([
        'program_courses.id',
        'program_courses.program_id',
        'program_courses.course_id',
        'program_courses.transaction_status_id',
        'program_courses.active',
        'program_courses.credits',
        'program_courses.certifiable',
        'program_courses.begin_date',
        'program_courses.end_date',
        'course.id',
        'course.name',
        'course.description',
        'course.active',
      ])
      .leftJoin('program_courses.course', 'course')
      .where('program_courses.id = :id', { id })
      .getOneOrFail();
  }

  async findByProgram(id: number): Promise<ProgramCourses[]> {
    return this.repository
      .createQueryBuilder('program_courses')
      .select([
        'program_courses.id',
        'program_courses.program_id',
        'program_courses.course_id',
        'program_courses.transaction_status_id',
        'program_courses.active',
        'program_courses.credits',
        'program_courses.certifiable',
        'program_courses.begin_date',
        'program_courses.end_date',
        'course.id',
        'course.name',
        'course.description',
        'course.active',
      ])
      .leftJoin('program_courses.course', 'course')
      .where('program_courses.program_id = :id', { id })
      .getMany();
  }
}
