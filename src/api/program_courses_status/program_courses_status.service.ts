import { Inject, Injectable } from '@nestjs/common';
import {
  CreateProgramCoursesStatusDto,
  UpdateProgramCoursesStatusDto,
  PROGRAM_COURSES_STATUS_REPOSITORY,
} from './program_courses_status.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { ProgramCoursesStatus } from './program_courses_status.entity';

@Injectable()
export class ProgramCoursesStatusService extends BaseService<
  ProgramCoursesStatus,
  CreateProgramCoursesStatusDto,
  UpdateProgramCoursesStatusDto
> {
  @Inject(PROGRAM_COURSES_STATUS_REPOSITORY)
  repository: BaseRepo<ProgramCoursesStatus>;
}
