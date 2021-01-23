import { Inject, Injectable } from '@nestjs/common';
import {
  CreateProgramsDto,
  PROGRAMS_PROVIDER,
  UpdateProgramsDto,
} from './programs.dto';
import { BaseService } from '../../base/base.service';
import { Programs } from './programs.entity';
import { BaseRepo } from '../../base/base.repository';
import { UpdateResult } from 'typeorm';
import { ProgramInterestAreasService } from '../program_interest_areas/program_interest_areas.service';

@Injectable()
export class ProgramsService extends BaseService<
  Programs,
  CreateProgramsDto,
  UpdateProgramsDto
> {
  @Inject(PROGRAMS_PROVIDER) repository: BaseRepo<Programs>;

  constructor(
    private programInterestAreasService: ProgramInterestAreasService,
  ) {
    super();
  }

  async findAll(): Promise<Programs[]> {
    return await this.repository.find({
      relations: ['program_type', 'program_status', 'organization'],
    });
  }

  async findOne(id: number): Promise<Programs> {
    return this.repository.findOneOrFail(id, {
      relations: [
        'program_type',
        'program_status',
        'organization',
        'program_interest_areas',
      ],
    });
  }

  async create(createDto: CreateProgramsDto) {
    const data: any = Object.assign({}, createDto);
    delete data.interest_areas;
    const dataNew = await this.repository.save(data);
    if (createDto.interest_areas) {
      await this.programInterestAreasService.set(
        dataNew.id,
        createDto.interest_areas,
      );
    }
    return dataNew;
  }

  async update(
    id: number,
    updateDto: UpdateProgramsDto,
  ): Promise<UpdateResult> {
    const data: any = Object.assign({}, updateDto);
    delete data.interest_areas;
    if (updateDto.interest_areas) {
      await this.programInterestAreasService.set(id, updateDto.interest_areas);
    }
    return await this.repository.update(id, data);
  }
}
