import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import { BaseController } from '../../base/base.controller';
import { Lessons } from './lessons.entity';
import { CreateLessonsDto, UpdateLessonsDto } from './lessons.dto';
import { Body, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import {
  InfoUserProvider,
  INFO_USER_PROVIDER,
} from 'src/utils/providers/info-user.module';

@ControllerApi({ name: 'lessons' })
export class LessonsController extends BaseController<
  Lessons,
  CreateLessonsDto,
  UpdateLessonsDto
> {
  constructor(
    private lessonsService: LessonsService,
    @Inject(INFO_USER_PROVIDER) private infoUser: InfoUserProvider,
  ) {
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

  @Get('student/:id')
  async student(@Param('id') id: number) {
    const result = await this.lessonsService.findLessonForStudent(
      id,
      this.infoUser.id,
    );
    return { data: result };
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

  @Post('change/order')
  async changeOrder(@Body() body: any) {
    const result = await this.lessonsService.changeOrder(body);
    return { data: result };
  }
}
