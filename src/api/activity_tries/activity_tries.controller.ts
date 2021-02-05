import { Body, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import { ActivityTriesService } from './activity_tries.service';
import { CreateIntentUserDto } from './activity_tries.dto';
import { BaseController } from '../../base/base.controller';
import { ActivityTries } from './activity_tries.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'activity_tries' })
export class ActivityTriesController extends BaseController<
  ActivityTries,
  CreateIntentUserDto,
  null
> {
  constructor(private activity_triesService: ActivityTriesService) {
    super(activity_triesService);
  }

  @Get()
  async fetchAll() {
    return await this.findAll();
  }

  @Get('lesson_activity/list/:id')
  async findAllByLesson(@Param('id') id: number) {
    const result = await this.activity_triesService.findAllByLessonActivity(id);
    return { data: result };
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.findOne(id);
  }

  @Post()
  async post(@Body() createDto: CreateIntentUserDto) {
    return await this.activity_triesService.create(createDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
