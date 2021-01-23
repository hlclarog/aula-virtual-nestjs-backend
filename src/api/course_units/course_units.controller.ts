import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import { BaseController } from '../../base/base.controller';
import { CourseUnits } from './course_units.entity';
import { CreateCourseUnitsDto, UpdateCourseUnitsDto } from './course_units.dto';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CourseUnitsService } from './course_units.service';

@ControllerApi({ name: 'course_units' })
export class CourseUnitsController extends BaseController<
  CourseUnits,
  CreateCourseUnitsDto,
  UpdateCourseUnitsDto
> {
  constructor(private courseUnitsService: CourseUnitsService) {
    super(courseUnitsService);
  }

  @Post()
  async post(@Body() createDto: CreateCourseUnitsDto) {
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
  async edit(@Param('id') id: string, @Body() updateDto: UpdateCourseUnitsDto) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }

  @Get('course/:id')
  async getByCourse(@Param('id') id: number) {
    const result = await this.courseUnitsService.findByCourse(id);
    return { data: result };
  }
}
