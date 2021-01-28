import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LessonScormsService } from './lesson_scorms.service';
import {
  CreateLessonScormsDto,
  UpdateLessonScormsDto,
} from './lesson_scorms.dto';
import { BaseController } from '../../base/base.controller';
import { LessonScorms } from './lesson_scorms.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'lesson_scorms' })
export class LessonScormsController extends BaseController<
  LessonScorms,
  CreateLessonScormsDto,
  UpdateLessonScormsDto
> {
  constructor(lesson_scormsService: LessonScormsService) {
    super(lesson_scormsService);
  }

  @Post()
  async post(@Body() createDto: CreateLessonScormsDto) {
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
    @Body() updateDto: UpdateLessonScormsDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
