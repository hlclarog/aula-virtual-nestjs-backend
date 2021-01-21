import { Inject, Injectable } from '@nestjs/common';
import {
  CreateCourseComissionOrganizationsDto,
  UpdateCourseComissionOrganizationsDto,
  PROGRAM_STATUS_PROVIDER,
} from './course_comission_organizations.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { CourseComissionOrganizations } from './course_comission_organizations.entity';

@Injectable()
export class CourseComissionOrganizationsService extends BaseService<
  CourseComissionOrganizations,
  CreateCourseComissionOrganizationsDto,
  UpdateCourseComissionOrganizationsDto
> {
  @Inject(PROGRAM_STATUS_PROVIDER) repository: BaseRepo<CourseComissionOrganizations>;
}
