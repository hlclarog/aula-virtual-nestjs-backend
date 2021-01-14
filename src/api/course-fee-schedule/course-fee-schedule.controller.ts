import { Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CourseFeeScheduleService } from './course-fee-schedule.service';

import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import { BaseController } from '../../base/base.controller';
import { CourseFeeSchedules } from './course-fee-schedule.entity';
import {
  CreateCourseFeeScheduleDto,
  UpdateCourseFeeScheduleDto,
} from './course-fee-schedule.dto';

@ControllerApi({ name: 'course-fee-schedule' })
export class CourseFeeScheduleController extends BaseController<
  CourseFeeSchedules,
  CreateCourseFeeScheduleDto,
  UpdateCourseFeeScheduleDto
> {
  constructor(
    private readonly courseFeeScheduleService: CourseFeeScheduleService,
  ) {
    super(courseFeeScheduleService);
  }
  @Post()
  async post(@Body() createDto: CreateCourseFeeScheduleDto) {
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
    @Body() updateDto: UpdateCourseFeeScheduleDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.remove(id);
  }

  @Get('bycourse:id')
  async getByCourse(@Param('id') id: number) {
    return this.courseFeeScheduleService.findByCourse(id);
  }
}
