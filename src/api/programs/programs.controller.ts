import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { BaseController } from '../../base/base.controller';
import { Programs } from './programs.entity';
import { CreateProgramsDto, UpdateProgramsDto } from './programs.dto';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'programs' })
export class ProgramsController extends BaseController<
  Programs,
  CreateProgramsDto,
  UpdateProgramsDto
> {
  constructor(private readonly programsService: ProgramsService) {
    super(programsService);
  }
  @Post()
  async post(@Body() createDto: CreateProgramsDto) {
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
  async edit(@Param('id') id: string, @Body() updateDto: UpdateProgramsDto) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
