import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ActivityTypesService } from './activity_types.service';
import {
  CreateActivityTypesDto,
  UpdateActivityTypesDto,
} from './activity_types.dto';
import { BaseController } from '../../base/base.controller';
import { ActivityTypes } from './activity_types.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'activity_types' })
export class ActivityTypesController extends BaseController<
  ActivityTypes,
  CreateActivityTypesDto,
  UpdateActivityTypesDto
> {
  constructor(activity_typesService: ActivityTypesService) {
    super(activity_typesService);
  }

  @Post()
  async post(@Body() createDto: CreateActivityTypesDto) {
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
    @Body() updateDto: UpdateActivityTypesDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
