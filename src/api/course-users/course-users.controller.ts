import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BaseController } from '../../base/base.controller';
import { CourseUsers } from './course-users.entity';
import { CreateCourseDto, UpdateCourseDto } from '../courses/courses.dto';
import { CoursesService } from '../courses/courses.service';

@Controller('course-users')
export class CourseUsersController extends BaseController<
  CourseUsers,
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
