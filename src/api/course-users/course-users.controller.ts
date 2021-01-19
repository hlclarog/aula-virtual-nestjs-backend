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

@ControllerApi({ name: 'course-users' })
export class CourseUsersController extends BaseController<
  CourseUsers,
  CreateCourseDto,
  UpdateCourseDto
> {
  constructor(private readonly courseUsersService: CourseUsersService) {
    super(courseUsersService);
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
