import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import { BaseController } from '../../base/base.controller';
import { CourseLessons } from './course_lessons.entity';
import { CreateCourseLessonsDto, UpdateCourseLessonsDto } from './course_lessons.dto';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CourseLessonsService } from './course_lessons.service';

@ControllerApi({ name: 'course_lessons' })
export class CourseLessonsController extends BaseController<
  CourseLessons,
  CreateCourseLessonsDto,
  UpdateCourseLessonsDto
> {
  constructor(private courseLessonsService: CourseLessonsService) {
    super(courseLessonsService);
  }

  @Post()
  async post(@Body() createDto: CreateCourseLessonsDto) {
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
  async edit(@Param('id') id: string, @Body() updateDto: UpdateCourseLessonsDto) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }

  @Get('course/:id')
  async getByCourse(@Param('id') id: number) {
    const result = await this.courseLessonsService.findByCourse(id);
    return { data: result };
  }

  @Post('change/order')
  async changeOrder(@Body() body: any) {
    const result = await this.courseLessonsService.changeOrder(body);
    return { data: result };
  }
}
