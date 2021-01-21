import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BaseController } from '../../base/base.controller';
import { ProgramInterestAreas } from './program_interest_areas.entity';
import { ProgramInterestAreasService } from './program_interest_areas.service';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import {
  CreateProgramInterestAreasDto,
  UpdateProgramInterestAreasDto,
} from './program_interest_areas.dto';

@ControllerApi({ name: 'program_interest_areas' })
export class ProgramInterestAreasController extends BaseController<
  ProgramInterestAreas,
  CreateProgramInterestAreasDto,
  UpdateProgramInterestAreasDto
> {
  constructor(
    private readonly programInterestAreasService: ProgramInterestAreasService,
  ) {
    super(programInterestAreasService);
  }

  @Post()
  async post(@Body() createDto: CreateProgramInterestAreasDto) {
    return await this.create(createDto);
  }

  @Get()
  async fetchAll() {
    return await this.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.findOne(id);
  }

  @Put(':id')
  async edit(
    @Param('id') id: string,
    @Body() updateDto: UpdateProgramInterestAreasDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }

  @Get('program/:id')
  async getByProgram(@Param('id') id: number) {
    const result = await this.programInterestAreasService.findByProgram(id);
    return { data: result };
  }
}
