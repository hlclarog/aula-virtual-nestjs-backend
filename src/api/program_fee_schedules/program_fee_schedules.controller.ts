import { Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ProgramFeeSchedulesService } from './program_fee_schedules.service';

import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import { BaseController } from '../../base/base.controller';
import { ProgramFeeSchedules } from './program_fee_schedules.entity';
import {
  CreateProgramFeeSchedulesDto,
  UpdateProgramFeeSchedulesDto,
} from './program_fee_schedules.dto';

@ControllerApi({ name: 'program_fee_schedules' })
export class ProgramFeeSchedulesController extends BaseController<
  ProgramFeeSchedules,
  CreateProgramFeeSchedulesDto,
  UpdateProgramFeeSchedulesDto
> {
  constructor(
    private readonly programFeeSchedulesService: ProgramFeeSchedulesService,
  ) {
    super(programFeeSchedulesService);
  }
  @Post()
  async post(@Body() createDto: CreateProgramFeeSchedulesDto) {
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
    @Body() updateDto: UpdateProgramFeeSchedulesDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.remove(id);
  }

  @Get('program/:id')
  async getByProgram(@Param('id') id: number) {
    const result = await this.programFeeSchedulesService.findByProgram(id);
    return { data: result };
  }
}
