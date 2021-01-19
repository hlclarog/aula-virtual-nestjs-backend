import { Inject, Injectable } from '@nestjs/common';
import {
  CreateProgramStatusDto,
  UpdateProgramStatusDto,
  PROGRAM_STATUS_PROVIDER,
} from './program_status.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { ProgramStatus } from './program_status.entity';

@Injectable()
export class ProgramStatusService extends BaseService<
  ProgramStatus,
  CreateProgramStatusDto,
  UpdateProgramStatusDto
> {
  @Inject(PROGRAM_STATUS_PROVIDER) repository: BaseRepo<ProgramStatus>;
}
