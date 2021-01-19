import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProgramStatusService } from './program_status.service';
import {
  CreateProgramStatusDto,
  UpdateProgramStatusDto,
} from './program_status.dto';
import { BaseController } from '../../base/base.controller';
import { ProgramStatus } from './program_status.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'program_status' })
export class ProgramStatusController extends BaseController<
  ProgramStatus,
  CreateProgramStatusDto,
  UpdateProgramStatusDto
> {
  constructor(program_statusService: ProgramStatusService) {
    super(program_statusService);
  }

  @Post()
  async post(@Body() createDto: CreateProgramStatusDto) {
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
    @Body() updateDto: UpdateProgramStatusDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
