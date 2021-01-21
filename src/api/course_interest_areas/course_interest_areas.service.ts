import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../../base/base.service';
import { CourseInterestAreas } from './course_interest_areas.entity';
import { BaseRepo } from '../../base/base.repository';
import {
  CreateCourseInterestAreasDto,
  COURSE_INTEREST_AREAS_PROVIDER,
  UpdateCourseInterestAreasDto,
} from './course_interest_areas.dto';

@Injectable()
export class CourseInterestAreasService extends BaseService<
  CourseInterestAreas,
  CreateCourseInterestAreasDto,
  UpdateCourseInterestAreasDto
> {
  @Inject(COURSE_INTEREST_AREAS_PROVIDER)
  repository: BaseRepo<CourseInterestAreas>;

  async findByCourse(id: number): Promise<CourseInterestAreas[]> {
    return await this.repository.find({
      where: { course: id },
    });
  }
}
