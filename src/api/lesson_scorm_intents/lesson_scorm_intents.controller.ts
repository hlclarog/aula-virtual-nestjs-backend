import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LessonScormIntentsService } from './lesson_scorm_intents.service';
import {
  CreateLessonScormIntentsDto,
  UpdateLessonScormIntentsDto,
} from './lesson_scorm_intents.dto';
import { BaseController } from '../../base/base.controller';
import { LessonScormIntents } from './lesson_scorm_intents.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'lesson_scorm_intents' })
export class LessonScormIntentsController extends BaseController<
  LessonScormIntents,
  CreateLessonScormIntentsDto,
  UpdateLessonScormIntentsDto
> {
  constructor(lesson_scorm_intentsService: LessonScormIntentsService) {
    super(lesson_scorm_intentsService);
  }

  @Post()
  async post(@Body() createDto: CreateLessonScormIntentsDto) {
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
    @Body() updateDto: UpdateLessonScormIntentsDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
