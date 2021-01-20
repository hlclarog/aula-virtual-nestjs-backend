import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  PROGRAM_FEE_SCHEDULE_PROVIDER,
  CreateProgramFeeSchedulesDto,
  UpdateProgramFeeSchedulesDto,
} from './program_fee_schedules.dto';
import { BaseService } from '../../base/base.service';
import { ProgramFeeSchedules } from './program_fee_schedules.entity';
import { BaseRepo } from '../../base/base.repository';
import { UpdateResult } from 'typeorm';

@Injectable()
export class ProgramFeeSchedulesService extends BaseService<
  ProgramFeeSchedules,
  CreateProgramFeeSchedulesDto,
  UpdateProgramFeeSchedulesDto
> {
  @Inject(PROGRAM_FEE_SCHEDULE_PROVIDER)
  repository: BaseRepo<ProgramFeeSchedules>;

  async create(createDto: CreateProgramFeeSchedulesDto) {
    await this.validateFeeSchedule(
      createDto.program,
      createDto.currency,
      createDto.begin,
      createDto.end,
      0,
    );
    return await this.repository.save(createDto);
  }

  async update(
    id: number,
    updateDto: UpdateProgramFeeSchedulesDto,
  ): Promise<UpdateResult> {
    await this.validateFeeSchedule(
      updateDto.program,
      updateDto.currency,
      updateDto.begin,
      updateDto.end,
      id,
    );
    return await this.repository.update(id, updateDto);
  }

  async validateFeeSchedule(program_id, currency_id, begin, end, id) {
    const register_founds = await this.repository
      .createQueryBuilder('item')
      .where('item.program_id = :program_id', { program_id })
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
          'A rate schedule already exists for this date range for this program',
      });
    }
  }

  async findByProgram(id: number): Promise<ProgramFeeSchedules[]> {
    return await this.repository.find({
      where: { program: id },
    });
  }
}
