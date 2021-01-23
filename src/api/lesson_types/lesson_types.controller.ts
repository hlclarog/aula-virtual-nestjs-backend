import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LessonTypesService } from './lesson_types.service';
import { CreateLessonTypesDto, UpdateLessonTypesDto } from './lesson_types.dto';
import { BaseController } from '../../base/base.controller';
import { LessonTypes } from './lesson_types.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'lesson_types' })
export class LessonTypesController extends BaseController<
  LessonTypes,
  CreateLessonTypesDto,
  UpdateLessonTypesDto
> {
  constructor(lesson_typesService: LessonTypesService) {
    super(lesson_typesService);
  }

  @Post()
  async post(@Body() createDto: CreateLessonTypesDto) {
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
  async edit(@Param('id') id: string, @Body() updateDto: UpdateLessonTypesDto) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
