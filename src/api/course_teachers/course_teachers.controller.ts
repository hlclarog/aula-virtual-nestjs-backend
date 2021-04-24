import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BaseController } from '../../base/base.controller';
import { CourseTeachers } from './course_teachers.entity';
import { CourseTeachersService } from './course_teachers.service';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import {
  CreateCourseTeachersDto,
  UpdateCourseTeachersDto,
} from './course_teachers.dto';

@ControllerApi({ name: 'course_teachers' })
export class CourseTeachersController extends BaseController<
  CourseTeachers,
  CreateCourseTeachersDto,
  UpdateCourseTeachersDto
> {
  constructor(private readonly courseTeachersService: CourseTeachersService) {
    super(courseTeachersService);
  }

  @Post()
  async post(@Body() createDto: CreateCourseTeachersDto) {
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
    @Body() updateDto: UpdateCourseTeachersDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }

  @Get('course/:id')
  async getByCourse(@Param('id') id: number) {
    const result = await this.courseTeachersService.findByCourse(id);
    return { data: result };
  }
}
