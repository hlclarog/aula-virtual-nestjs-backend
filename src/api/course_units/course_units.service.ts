import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../../base/base.service';
import {
  COURSE_UNITS_PROVIDER,
  CreateCourseUnitsDto,
  UpdateCourseUnitsDto,
} from './course_units.dto';
import { CourseUnits } from './course_units.entity';
import { BaseRepo } from '../../base/base.repository';

@Injectable()
export class CourseUnitsService extends BaseService<
  CourseUnits,
  CreateCourseUnitsDto,
  UpdateCourseUnitsDto
> {
  @Inject(COURSE_UNITS_PROVIDER) repository: BaseRepo<CourseUnits>;

  async findByCourse(id: number): Promise<CourseUnits[]> {
    return await this.repository.find({
      where: { course: id },
    });
  }
}
