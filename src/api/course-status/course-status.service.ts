import { Inject, Injectable } from '@nestjs/common';

import {
  COURSE_STATUS_PROVIDER, CreateCourseStatusDto, UpdateCourseStatusDto
} from './course-status.dto';
import { BaseService } from '../../base/base.service';
import { CourseStatus } from './course-status.entity';
import { BaseRepo } from '../../base/base.repository';

@Injectable()
export class CourseStatusService extends BaseService<
  CourseStatus,
  CreateCourseStatusDto,
  UpdateCourseStatusDto
> {
  @Inject(COURSE_STATUS_PROVIDER) repository: BaseRepo<CourseStatus>;
}
