import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../../base/base.service';
import { CourseCommissionOrganizations } from './course_commission_organizations.entity';
import {
  COURSE_COMMISSION_ORGANIZATIONS_PROVIDER,
  CreateCourseCommissionOrganizationsDto,
  UpdateCourseCommissionOrganizationsDto,
} from './course_commission_organizations.dto';
import { BaseRepo } from '../../base/base.repository';

@Injectable()
export class CourseCommissionOrganizationsService extends BaseService<
  CourseCommissionOrganizations,
  CreateCourseCommissionOrganizationsDto,
  UpdateCourseCommissionOrganizationsDto
> {
  @Inject(COURSE_COMMISSION_ORGANIZATIONS_PROVIDER)
  repository: BaseRepo<CourseCommissionOrganizations>;

  async findByCourse(id: number): Promise<CourseCommissionOrganizations[]> {
    return await this.repository.find({
      where: { course_id: id },
      relations: ['course', 'organization'],
    });
  }
}
