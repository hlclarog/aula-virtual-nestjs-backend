import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  COURSE_FEE_SCHEDULE_PROVIDER,
  CreateCourseFeeScheduleDto,
  UpdateCourseFeeScheduleDto,
} from './course-fee-schedule.dto';
import { BaseService } from '../../base/base.service';
import { CourseFeeSchedules } from './course-fee-schedule.entity';
import { BaseRepo } from '../../base/base.repository';
import { UpdateResult } from 'typeorm';

@Injectable()
export class CourseFeeScheduleService extends BaseService<
  CourseFeeSchedules,
  CreateCourseFeeScheduleDto,
  UpdateCourseFeeScheduleDto
> {
  @Inject(COURSE_FEE_SCHEDULE_PROVIDER)
  repository: BaseRepo<CourseFeeSchedules>;

  async create(createDto: CreateCourseFeeScheduleDto) {
    await this.validateFeeSchedule(
      createDto.course_id,
      createDto.currency_id,
      createDto.begin,
      createDto.end,
      0,
    );
    return await this.repository.save(createDto);
  }

  async update(
    id: number,
    updateDto: UpdateCourseFeeScheduleDto,
  ): Promise<UpdateResult> {
    await this.validateFeeSchedule(
      updateDto.course_id,
      updateDto.currency_id,
      updateDto.begin,
      updateDto.end,
      id,
    );
    return await this.repository.update(id, updateDto);
  }

  async validateFeeSchedule(course_id, currency_id, begin, end, id) {
    const register_founds = await this.repository
      .createQueryBuilder('item')
      .where('item.course_id = :course_id', { course_id })
      .andWhere('item.currency_id = :currency_id', { currency_id })
      .andWhere(
        '(:begin Between item.begin AND item.end OR :end Between item.begin AND item.end)',
        { begin, end },
      )
      .andWhere('(item.id != :id OR :id = 0)', { id })
      .getMany();
    if (register_founds.length > 0) {
      throw new BadRequestException({
        message:
          'A rate schedule already exists for this date range for this course',
      });
    }
  }

  async findByCourse(id: number): Promise<CourseFeeSchedules[]> {
    return await this.repository.find({
      where: { course_id: id },
    });
  }
}
