import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateCourseFeeScheduleService } from './create-course-fee-schedule.service';
import { CreateCreateCourseFeeScheduleDto } from './dto/create-create-course-fee-schedule.dto';
import { UpdateCreateCourseFeeScheduleDto } from './dto/update-create-course-fee-schedule.dto';

@Controller('create-course-fee-schedule')
export class CreateCourseFeeScheduleController {
  constructor(private readonly createCourseFeeScheduleService: CreateCourseFeeScheduleService) {}

  @Post()
  create(@Body() createCreateCourseFeeScheduleDto: CreateCreateCourseFeeScheduleDto) {
    return this.createCourseFeeScheduleService.create(createCreateCourseFeeScheduleDto);
  }

  @Get()
  findAll() {
    return this.createCourseFeeScheduleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.createCourseFeeScheduleService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCreateCourseFeeScheduleDto: UpdateCreateCourseFeeScheduleDto) {
    return this.createCourseFeeScheduleService.update(+id, updateCreateCourseFeeScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.createCourseFeeScheduleService.remove(+id);
  }
}
