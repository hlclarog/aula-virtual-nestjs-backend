import { Inject, Injectable } from '@nestjs/common';
import {
  CreateProgramTypesDto,
  UpdateProgramTypesDto,
  PROGRAM_TYPES_PROVIDER,
} from './program_types.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { ProgramTypes } from './program_types.entity';

@Injectable()
export class ProgramTypesService extends BaseService<
  ProgramTypes,
  CreateProgramTypesDto,
  UpdateProgramTypesDto
> {
  @Inject(PROGRAM_TYPES_PROVIDER) repository: BaseRepo<ProgramTypes>;
}
