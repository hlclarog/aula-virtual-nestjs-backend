import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ActivityMultipleOptionsService } from './activity_multiple_options.service';
import {
  CreateActivityMultipleOptionsDto,
  UpdateActivityMultipleOptionsDto,
} from './activity_multiple_options.dto';
import { BaseController } from '../../base/base.controller';
import { ActivityMultipleOptions } from './activity_multiple_options.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'activity_multiple_options' })
export class ActivityMultipleOptionsController extends BaseController<
  ActivityMultipleOptions,
  CreateActivityMultipleOptionsDto,
  UpdateActivityMultipleOptionsDto
> {
  constructor(
    private activity_multiple_optionsService: ActivityMultipleOptionsService,
  ) {
    super(activity_multiple_optionsService);
  }

  @Post()
  async post(@Body() createDto: CreateActivityMultipleOptionsDto) {
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
    @Body() updateDto: UpdateActivityMultipleOptionsDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
