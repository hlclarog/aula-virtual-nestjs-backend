import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LessonScormResourcesService } from './lesson_scorm_resources.service';
import {
  CreateLessonScormResourcesDto,
  UpdateLessonScormResourcesDto,
} from './lesson_scorm_resources.dto';
import { BaseController } from '../../base/base.controller';
import { LessonScormResources } from './lesson_scorm_resources.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'lesson_scorm_resources' })
export class LessonScormResourcesController extends BaseController<
  LessonScormResources,
  CreateLessonScormResourcesDto,
  UpdateLessonScormResourcesDto
> {
  constructor(lesson_scorm_resourcesService: LessonScormResourcesService) {
    super(lesson_scorm_resourcesService);
  }

  @Post()
  async post(@Body() createDto: CreateLessonScormResourcesDto) {
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
    @Body() updateDto: UpdateLessonScormResourcesDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
