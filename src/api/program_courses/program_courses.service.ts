import { Inject, Injectable } from '@nestjs/common';
import {
  CreateProgramCoursesDto,
  UpdateProgramCoursesDto,
  PROGRAM_COURSES_PROVIDER,
} from './program_courses.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { ProgramCourses } from './program_courses.entity';
import { AwsService } from '../../aws/aws.service';
import { ProgramUserCourseService } from '../program_user_course/program_user_course.service';

@Injectable()
export class ProgramCoursesService extends BaseService<
  ProgramCourses,
  CreateProgramCoursesDto,
  UpdateProgramCoursesDto
  > {
  @Inject(PROGRAM_COURSES_PROVIDER) repository: BaseRepo<ProgramCourses>;

  constructor(
    protected awsService: AwsService,
    protected programUserCourseService: ProgramUserCourseService,
  ) {
    super();
  }

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

  async findByProgram(id: number, userId?: number): Promise<ProgramCourses[]> {
    const result = await this.repository
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
        'course.picture',
        'course.description',
        'course.active',
      ])
      .leftJoin('program_courses.course', 'course')
      .where('program_courses.program_id = :id', { id })
      .getMany();
    let enroll = [];
    if (userId) {
      enroll = await this.programUserCourseService.getProgramUser(id, userId);
    }
    result.map(async (item) => {
      item.course.picture = await this.awsService.getFile(item.course.picture);
      item['enrollment'] = await enroll.filter(
        (word) => word.course_users.course_id == item.course_id,
      );
    });

    return result;
  }
  async getCreditsByProgram(id: number) {
    const result = await this.repository
      .createQueryBuilder('program_courses')
      .select('SUM(program_courses.credits)', 'credits')
      .where('program_courses.program_id = :id', { id: id })
      .getRawOne();
    return result;
  }
}
