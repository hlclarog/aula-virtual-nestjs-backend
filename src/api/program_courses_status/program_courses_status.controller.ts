import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProgramCoursesStatusService } from './program_courses_status.service';
import {
  CreateProgramCoursesStatusDto,
  UpdateProgramCoursesStatusDto,
} from './program_courses_status.dto';
import { BaseController } from '../../base/base.controller';
import { ProgramCoursesStatus } from './program_courses_status.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'program_courses_status' })
export class ProgramCoursesStatusController extends BaseController<
  ProgramCoursesStatus,
  CreateProgramCoursesStatusDto,
  UpdateProgramCoursesStatusDto
> {
  constructor(program_courses_statusService: ProgramCoursesStatusService) {
    super(program_courses_statusService);
  }

  @Post()
  async post(@Body() createDto: CreateProgramCoursesStatusDto) {
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
    @Body() updateDto: UpdateProgramCoursesStatusDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
