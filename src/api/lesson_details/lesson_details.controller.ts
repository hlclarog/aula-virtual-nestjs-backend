import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LessonDetailsService } from './lesson_details.service';
import {
  CreateLessonDetailsDto,
  UpdateLessonDetailsDto,
  UpdateOrderLessonDetailsDto,
} from './lesson_details.dto';
import { BaseController } from '../../base/base.controller';
import { LessonDetails } from './lesson_details.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'lesson_details' })
export class LessonDetailsController extends BaseController<
  LessonDetails,
  CreateLessonDetailsDto,
  UpdateLessonDetailsDto
> {
  constructor(protected lesson_detailsService: LessonDetailsService) {
    super(lesson_detailsService);
  }

  @Post()
  async post(@Body() createDto: CreateLessonDetailsDto) {
    return await this.create(createDto);
  }

  @Post('reorder')
  async reorder(@Body() orderDto: UpdateOrderLessonDetailsDto) {
    const result = await this.lesson_detailsService.reorder(orderDto);
    return {
      data: result,
    };
  }

  @Get()
  async fetchAll() {
    return await this.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.findOne(id);
  }

  @Get('course_lesson/:id')
  async getByLession(@Param('id') id: number) {
    const result = await this.lesson_detailsService.getByCourseLesson(id);
    return {
      data: result,
    };
  }

  @Put(':id')
  async edit(
    @Param('id') id: string,
    @Body() updateDto: UpdateLessonDetailsDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
