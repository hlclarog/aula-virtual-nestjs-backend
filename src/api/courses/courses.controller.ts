import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import { BaseController } from '../../base/base.controller';
import { Course } from './course.entity';
import { CreateCourseDto, UpdateCourseDto } from './courses.dto';


@ControllerApi({ name: 'courses' })
export class CoursesController extends BaseController<
  Course,
  CreateCourseDto,
  UpdateCourseDto
> {
  constructor(private readonly coursesService: CoursesService) {
    super(coursesService);
  }
  @Post()
  async post(@Body() createDto: CreateCourseDto) {
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
  async edit(@Param('id') id: string, @Body() updateDto: UpdateCourseDto) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
