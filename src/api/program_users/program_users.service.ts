import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../../base/base.service';
import { ProgramUsers } from './program_users.entity';
import { BaseRepo } from '../../base/base.repository';
import {
  CreateProgramUsersDto,
  EnrollmentProgramUsersDto,
  PROGRAM_USERS_PROVIDER,
  UpdateProgramUsersDto,
} from './program_users.dto';
import { PROGRAMS_PROVIDER } from '../programs/programs.dto';
import { Programs } from '../programs/programs.entity';
import { CourseUsersService } from '../course-users/course-users.service';
import { EnrollmentCourseUsersDto } from '../course-users/course-users.dto';
import { ENROLLMENT_STATUS_ENUM } from '../enrollment-status/enrollment-status.dto';

@Injectable()
export class ProgramUsersService extends BaseService<
  ProgramUsers,
  CreateProgramUsersDto,
  UpdateProgramUsersDto
> {
  @Inject(PROGRAM_USERS_PROVIDER) repository: BaseRepo<ProgramUsers>;
  @Inject(PROGRAMS_PROVIDER) programs: BaseRepo<Programs>;

  constructor(private readonly courseUsersService: CourseUsersService) {
    super();
  }

  async findByProgram(id: number): Promise<ProgramUsers[]> {
    return this.repository
      .createQueryBuilder('program_users')
      .select([
        'program_users.id',
        'program_users.program_id',
        'program_users.user_id',
        'program_users.enrollment_status_id',
        'program_users.enrollment_type_id',
        'program_users.begin_date',
        'program_users.end_date',
        'program_users.certificate_file',
        'program_users.certificate_code_validation',
        'program_users.favorite',
        'program_users.downloaded',
        'program_users.active',
        'user.id',
        'user.name',
        'user.email',
        'user.active',
      ])
      .leftJoin('program_users.user', 'user')
      .where('program_users.program_id = :id', { id })
      .getMany();
  }

  async addEnrollment(programUserData: EnrollmentProgramUsersDto) {
    if (!programUserData.enrollment_status_id) {
      programUserData.enrollment_status_id = ENROLLMENT_STATUS_ENUM.REGISTERED;
    }
    const programUsersFound = await this.repository
      .createQueryBuilder()
      .where('user_id = :user_id AND program_id = :program_id', {
        user_id: programUserData.user_id,
        program_id: programUserData.program_id,
      })
      .withDeleted()
      .getCount();
    if (programUsersFound) {
      await this.repository
        .createQueryBuilder()
        .update()
        .set({ deleted_at: null })
        .where('user_id = :user_id AND program_id = :program_id', {
          user_id: programUserData.user_id,
          program_id: programUserData.program_id,
        })
        .execute();
    } else {
      await this.repository
        .createQueryBuilder()
        .insert()
        .into(ProgramUsers)
        .values(programUserData)
        .execute();
    }

    const programUsersResult = await this.repository
      .createQueryBuilder('program_users')
      .where(
        'program_users.user_id = :user_id AND program_users.program_id = :program_id',
        {
          user_id: programUserData.user_id,
          program_id: programUserData.program_id,
        },
      )
      .leftJoinAndSelect('program_users.program', 'program')
      .leftJoinAndSelect('program.program_courses', 'program_courses')
      .getOne();

    if (!programUsersResult.program.by_credit) {
      await this.addCourseUser(programUsersResult);
    }
  }

  async addCourseUser(programUsersResult: ProgramUsers) {
    programUsersResult.program.program_courses.map(async (programCourse) => {
      const courseUsersDto: EnrollmentCourseUsersDto = {
        program_user_id: programUsersResult.id,
        user_id: programUsersResult.user_id,
        program_id: programCourse.program_id,
        course_id: programCourse.course_id,
      };
      await this.courseUsersService.addEnrollment(courseUsersDto);
    });
  }
}
