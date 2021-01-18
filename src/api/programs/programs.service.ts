import { Inject, Injectable } from '@nestjs/common';
import {
  CreateProgramsDto,
  PROGRAMS_PROVIDER,
  UpdateProgramsDto,
} from './programs.dto';
import { BaseService } from '../../base/base.service';
import { Programs } from './program.entity';
import { BaseRepo } from '../../base/base.repository';

@Injectable()
export class ProgramsService extends BaseService<
  Programs,
  CreateProgramsDto,
  UpdateProgramsDto
> {
  @Inject(PROGRAMS_PROVIDER) repository: BaseRepo<Programs>;
}
