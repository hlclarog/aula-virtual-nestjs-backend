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
import { CourseUsersService } from './course-users.service';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import { CreateCourseUsersDto, UpdateCourseUsersDto } from './course-users.dto';

@ControllerApi({ name: 'course-users' })
export class CourseUsersController extends BaseController<
  CourseUsers,
  CreateCourseUsersDto,
  UpdateCourseUsersDto
> {
  constructor(private readonly courseUsersService: CourseUsersService) {
    super(courseUsersService);
  }

  @Post()
  async post(@Body() createDto: CreateCourseUsersDto) {
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
  async edit(@Param('id') id: string, @Body() updateDto: UpdateCourseUsersDto) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}