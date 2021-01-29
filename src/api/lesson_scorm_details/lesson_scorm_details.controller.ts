import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LessonScormDetailsService } from './lesson_scorm_details.service';
import {
  CreateLessonScormDetailsDto,
  UpdateLessonScormDetailsDto,
} from './lesson_scorm_details.dto';
import { BaseController } from '../../base/base.controller';
import { LessonScormDetails } from './lesson_scorm_details.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'lesson_scorm_details' })
export class LessonScormDetailsController extends BaseController<
  LessonScormDetails,
  CreateLessonScormDetailsDto,
  UpdateLessonScormDetailsDto
> {
  constructor(lesson_scorm_detailsService: LessonScormDetailsService) {
    super(lesson_scorm_detailsService);
  }

  @Post()
  async post(@Body() createDto: CreateLessonScormDetailsDto) {
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
    @Body() updateDto: UpdateLessonScormDetailsDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
