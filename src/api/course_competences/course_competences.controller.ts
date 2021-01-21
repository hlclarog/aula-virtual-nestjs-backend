import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import { BaseController } from '../../base/base.controller';
import { CourseCompetences } from './course_competences.entity';
import {
  CreateCourseCompetencesDto,
  UpdateCourseCompetencesDto,
} from './course_competences.dto';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CourseCompetencesService } from './course_competences.service';

@ControllerApi({ name: 'course_competences' })
export class CourseCompetencesController extends BaseController<
  CourseCompetences,
  CreateCourseCompetencesDto,
  UpdateCourseCompetencesDto
> {
  constructor(courseCompetencesService: CourseCompetencesService) {
    super(courseCompetencesService);
  }

  @Post()
  async post(@Body() createDto: CreateCourseCompetencesDto) {
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
    @Body() updateDto: UpdateCourseCompetencesDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
