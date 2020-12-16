import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { EmailActivitiesService } from './email_activities.service';
import {
  CreateEmailActivitiesDto,
  UpdateEmailActivitiesDto,
} from './email_activities.dto';
import { BaseController } from '../../base/base.controller';
import { EmailActivities } from './email_activities.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('email_activities')
@Controller('/api/email_activities')
export class EmailActivitiesController extends BaseController<
  EmailActivities,
  CreateEmailActivitiesDto,
  UpdateEmailActivitiesDto
> {
  constructor(email_activitiesService: EmailActivitiesService) {
    super(email_activitiesService);
  }

  @Post()
  // TODO Asi se adiciona la description personalizada del servicio
  @ApiOperation({
    description: 'Asi se adiciona la description personalizada del servicio',
  })
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

  @Put(':id')
  async edit(@Param('id') id: string, @Body() updateDto: UpdateEmailActivitiesDto) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
