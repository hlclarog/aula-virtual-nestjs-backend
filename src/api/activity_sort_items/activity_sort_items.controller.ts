import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ActivitySortItemsService } from './activity_sort_items.service';
import {
  CreateActivitySortItemsDto,
  UpdateActivitySortItemsDto,
} from './activity_sort_items.dto';
import { BaseController } from '../../base/base.controller';
import { ActivitySortItems } from './activity_sort_items.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'activity_sort_items' })
export class ActivitySortItemsController extends BaseController<
  ActivitySortItems,
  CreateActivitySortItemsDto,
  UpdateActivitySortItemsDto
> {
  constructor(activity_sort_itemsService: ActivitySortItemsService) {
    super(activity_sort_itemsService);
  }

  @Post()
  async post(@Body() createDto: CreateActivitySortItemsDto) {
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
    @Body() updateDto: UpdateActivitySortItemsDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
