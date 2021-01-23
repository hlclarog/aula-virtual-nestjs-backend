import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import { BaseController } from '../../base/base.controller';
import { Lessons } from './lessons.entity';
import { CreateLessonsDto, UpdateLessonsDto } from './lessons.dto';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LessonsService } from './lessons.service';

@ControllerApi({ name: 'lessons' })
export class LessonsController extends BaseController<
  Lessons,
  CreateLessonsDto,
  UpdateLessonsDto
> {
  constructor(private lessonsService: LessonsService) {
    super(lessonsService);
  }

  @Post()
  async post(@Body() createDto: CreateLessonsDto) {
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
  async edit(@Param('id') id: string, @Body() updateDto: UpdateLessonsDto) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }

  @Get('course/:id')
  async getByCourse(@Param('id') id: number) {
    const result = await this.lessonsService.findByCourse(id);
    return { data: result };
  }
}
