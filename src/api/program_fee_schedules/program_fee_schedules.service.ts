import { Inject, Injectable } from '@nestjs/common';
import {
  PROGRAM_FEE_SCHEDULE_PROVIDER,
  CreateProgramFeeSchedulesDto,
  UpdateProgramFeeSchedulesDto,
} from './program_fee_schedules.dto';
import { BaseService } from '../../base/base.service';
import { ProgramFeeSchedules } from './program_fee_schedules.entity';
import { BaseRepo } from '../../base/base.repository';

@Injectable()
export class ProgramFeeSchedulesService extends BaseService<
  ProgramFeeSchedules,
  CreateProgramFeeSchedulesDto,
  UpdateProgramFeeSchedulesDto
> {
  @Inject(PROGRAM_FEE_SCHEDULE_PROVIDER)
  repository: BaseRepo<ProgramFeeSchedules>;

  async findByProgram(id: number): Promise<ProgramFeeSchedules[]> {
    return await this.repository.find({
      where: { program: id },
    });
  }
}
