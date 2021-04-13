import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LessonActivitiesService } from './lesson_activities.service';
import {
  CreateLessonActivitiesDto,
  UpdateLessonActivitiesDto,
} from './lesson_activities.dto';
import { BaseController } from '../../base/base.controller';
import { LessonActivities } from './lesson_activities.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'lesson_activities' })
export class LessonActivitiesController extends BaseController<
  LessonActivities,
  CreateLessonActivitiesDto,
  UpdateLessonActivitiesDto
> {
  constructor(public lesson_activitiesService: LessonActivitiesService) {
    super(lesson_activitiesService);
  }

  @Post()
  async post(@Body() createDto: CreateLessonActivitiesDto) {
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
    @Body() updateDto: UpdateLessonActivitiesDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }

  @Get('lesson/:id')
  async findAllByLesson(@Param('id') id: number) {
    const result = await this.lesson_activitiesService.findAllByLesson(id);
    return { data: result };
  }
}
