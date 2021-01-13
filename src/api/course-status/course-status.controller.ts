import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CourseStatusService } from './course-status.service';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import { BaseController } from '../../base/base.controller';
import { CourseStatus } from './course-status.entity';
import { CreateCourseStatusDto, UpdateCourseStatusDto } from './course-status.dto';



@ControllerApi({ name: 'course-status' })
export class CourseStatusController extends BaseController<
  CourseStatus,
  CreateCourseStatusDto,
  UpdateCourseStatusDto
> {
  constructor(private readonly courseStatusService: CourseStatusService) {
    super(courseStatusService);
  }

  @Post()
  async post(@Body() createDto: CreateCourseStatusDto) {
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
    @Body() updateDto: UpdateCourseStatusDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.remove(id);
  }
}
