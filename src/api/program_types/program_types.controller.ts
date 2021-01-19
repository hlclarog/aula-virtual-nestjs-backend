import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProgramTypesService } from './program_types.service';
import {
  CreateProgramTypesDto,
  UpdateProgramTypesDto,
} from './program_types.dto';
import { BaseController } from '../../base/base.controller';
import { ProgramTypes } from './program_types.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'program_types' })
export class ProgramTypesController extends BaseController<
  ProgramTypes,
  CreateProgramTypesDto,
  UpdateProgramTypesDto
> {
  constructor(program_typesService: ProgramTypesService) {
    super(program_typesService);
  }

  @Post()
  async post(@Body() createDto: CreateProgramTypesDto) {
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
    @Body() updateDto: UpdateProgramTypesDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
