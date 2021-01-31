import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LessonDetailsService } from './lesson_details.service';
import {
  CreateLessonDetailsDto,
  UpdateLessonDetailsDto,
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
  constructor(lesson_detailsService: LessonDetailsService) {
    super(lesson_detailsService);
  }

  @Post()
  async post(@Body() createDto: CreateLessonDetailsDto) {
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

  @Get('/bylesson/:id')
  async getByLession(id: number) {
    return await this.getByLession(id);
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
