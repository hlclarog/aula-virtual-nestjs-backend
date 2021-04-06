import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LessonPermissionTypesService } from './lesson_permission_types.service';
import {
  CreateLessonPermissionTypesDto,
  UpdateLessonPermissionTypesDto,
} from './lesson_permission_types.dto';
import { BaseController } from '../../base/base.controller';
import { LessonPermissionTypes } from './lesson_permission_types.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'lesson_permission_types' })
export class LessonPermissionTypesController extends BaseController<
  LessonPermissionTypes,
  CreateLessonPermissionTypesDto,
  UpdateLessonPermissionTypesDto
> {
  constructor(lesson_permission_typesService: LessonPermissionTypesService) {
    super(lesson_permission_typesService);
  }

  @Post()
  async post(@Body() createDto: CreateLessonPermissionTypesDto) {
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
    @Body() updateDto: UpdateLessonPermissionTypesDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
