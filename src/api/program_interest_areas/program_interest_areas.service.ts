import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../../base/base.service';
import { ProgramInterestAreas } from './program_interest_areas.entity';
import { BaseRepo } from '../../base/base.repository';
import {
  CreateProgramInterestAreasDto,
  PROGRAM_INTEREST_AREAS_PROVIDER,
  UpdateProgramInterestAreasDto,
} from './program_interest_areas.dto';

@Injectable()
export class ProgramInterestAreasService extends BaseService<
  ProgramInterestAreas,
  CreateProgramInterestAreasDto,
  UpdateProgramInterestAreasDto
> {
  @Inject(PROGRAM_INTEREST_AREAS_PROVIDER)
  repository: BaseRepo<ProgramInterestAreas>;

  async findByProgram(id: number): Promise<ProgramInterestAreas[]> {
    return await this.repository.find({
      where: { program: id },
    });
  }
}
