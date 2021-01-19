import { Inject, Injectable } from '@nestjs/common';
import {
  CreateProgramsDto,
  PROGRAMS_PROVIDER,
  UpdateProgramsDto,
} from './programs.dto';
import { BaseService } from '../../base/base.service';
import { Programs } from './programs.entity';
import { BaseRepo } from '../../base/base.repository';

@Injectable()
export class ProgramsService extends BaseService<
  Programs,
  CreateProgramsDto,
  UpdateProgramsDto
> {
  @Inject(PROGRAMS_PROVIDER) repository: BaseRepo<Programs>;

  async findAll(): Promise<Programs[]> {
    return await this.repository.find({
      relations: ['program_type', 'program_status', 'organization'],
    });
  }

  async findOne(id: number): Promise<Programs> {
    return this.repository.findOneOrFail(id, {
      relations: ['program_type', 'program_status', 'organization'],
    });
  }
}
