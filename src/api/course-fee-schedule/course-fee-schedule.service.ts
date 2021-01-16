import { Inject, Injectable } from '@nestjs/common';
import {
  COURSE_FEE_SCHEDULE_PROVIDER,
  CreateCourseFeeScheduleDto,
  UpdateCourseFeeScheduleDto,
} from './course-fee-schedule.dto';
import { BaseService } from '../../base/base.service';
import { CourseFeeSchedules } from './course-fee-schedule.entity';
import { BaseRepo } from '../../base/base.repository';

@Injectable()
export class CourseFeeScheduleService extends BaseService<
  CourseFeeSchedules,
  CreateCourseFeeScheduleDto,
  UpdateCourseFeeScheduleDto
> {
  @Inject(COURSE_FEE_SCHEDULE_PROVIDER)
  repository: BaseRepo<CourseFeeSchedules>;

  findByCourse(id: number): Promise<CourseFeeSchedules[]> {
    return this.repository.find({
      where: [{ course: id }],
    });
  }
}
