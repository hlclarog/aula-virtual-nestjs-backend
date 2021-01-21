import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BaseController } from '../../base/base.controller';
import { CourseInterestAreas } from './course_interest_areas.entity';
import { CourseInterestAreasService } from './course_interest_areas.service';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import {
  CreateCourseInterestAreasDto,
  UpdateCourseInterestAreasDto,
} from './course_interest_areas.dto';

@ControllerApi({ name: 'course_interest_areas' })
export class CourseInterestAreasController extends BaseController<
  CourseInterestAreas,
  CreateCourseInterestAreasDto,
  UpdateCourseInterestAreasDto
> {
  constructor(
    private readonly courseInterestAreasService: CourseInterestAreasService,
  ) {
    super(courseInterestAreasService);
  }

  @Post()
  async post(@Body() createDto: CreateCourseInterestAreasDto) {
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
    @Body() updateDto: UpdateCourseInterestAreasDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }

  @Get('course/:id')
  async getByCourse(@Param('id') id: number) {
    const result = await this.courseInterestAreasService.findByCourse(id);
    return { data: result };
  }
}
