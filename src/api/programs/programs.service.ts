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
import { AwsService } from './../../aws/aws.service';
import { typeFilesAwsNames } from './../../aws/aws.dto';
import * as shortid from 'shortid';

@Injectable()
export class ProgramsService extends BaseService<
  Programs,
  CreateProgramsDto,
  UpdateProgramsDto
> {
  @Inject(PROGRAMS_PROVIDER) repository: BaseRepo<Programs>;

  constructor(
    private programInterestAreasService: ProgramInterestAreasService,
    private awsService: AwsService,
  ) {
    super();
  }

  async findAll(): Promise<Programs[]> {
    return await this.repository.find({
      relations: ['program_type', 'program_status', 'organization'],
    });
  }

  async findOne(id: number): Promise<Programs> {
    const program = await this.repository.findOneOrFail(id, {
      relations: [
        'program_type',
        'program_status',
        'organization',
        'program_interest_areas',
      ],
    });
    if (program.picture) {
      program.picture = await this.awsService.getFile(program.picture);
    }
    if (program.video_url) {
      program.video_url = await this.awsService.getFile(program.video_url);
    }
    return program;
  }

  async create(createDto: CreateProgramsDto) {
    const data: any = Object.assign({}, createDto);
    delete data.interest_areas;
    if (createDto.picture) {
      data.picture = await this.setFile(
        createDto.picture,
        typeFilesAwsNames.program_pictures,
      );
    }
    if (createDto.video_url) {
      data.video_url = await this.setFile(
        createDto.video_url,
        typeFilesAwsNames.program_videos,
      );
    }
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
    if (updateDto.picture) {
      data.picture = await this.setFile(
        updateDto.picture,
        typeFilesAwsNames.program_pictures,
      );
    }
    if (updateDto.video_url) {
      data.video_url = await this.setFile(
        updateDto.video_url,
        typeFilesAwsNames.program_videos,
      );
    }
    if (updateDto.interest_areas) {
      await this.programInterestAreasService.set(id, updateDto.interest_areas);
    }
    return await this.repository.update(id, data);
  }

  async setFile(file, type) {
    const result = await this.awsService.saveFile({
      file,
      name: shortid.generate(),
      type,
    });
    return result.Key;
  }
}
