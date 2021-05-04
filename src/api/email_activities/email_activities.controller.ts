import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EmailActivitiesService } from './email_activities.service';
import {
  CreateEmailActivitiesDto,
  UpdateEmailActivitiesDto,
} from './email_activities.dto';
import { BaseController } from '../../base/base.controller';
import { EmailActivities } from './email_activities.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import {
  EMAIL_ACTIVITITES_TYPES,
  EMAIL_BUY_COURSE_HELP,
} from './email_activities_actions.dto';

@ControllerApi({ name: 'email_activities' })
export class EmailActivitiesController extends BaseController<
  EmailActivities,
  CreateEmailActivitiesDto,
  UpdateEmailActivitiesDto
> {
  constructor(email_activitiesService: EmailActivitiesService) {
    super(email_activitiesService);
  }

  @Post()
  async post(@Body() createDto: CreateEmailActivitiesDto) {
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

  @Get('actions/:activity_id')
  async actionsFind(@Param('activity_id') activity_id: number) {
    const leg = EMAIL_ACTIVITITES_TYPES[activity_id];
    const result = EMAIL_BUY_COURSE_HELP[leg];
    return { data: result ? result : {} };
  }

  @Put(':id')
  async edit(
    @Param('id') id: string,
    @Body() updateDto: UpdateEmailActivitiesDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
