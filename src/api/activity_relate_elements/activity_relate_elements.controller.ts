import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ActivityRelateElementsService } from './activity_relate_elements.service';
import {
  CreateActivityRelateElementsDto,
  UpdateActivityRelateElementsDto,
} from './activity_relate_elements.dto';
import { BaseController } from '../../base/base.controller';
import { ActivityRelateElements } from './activity_relate_elements.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'activity_relate_elements' })
export class ActivityRelateElementsController extends BaseController<
  ActivityRelateElements,
  CreateActivityRelateElementsDto,
  UpdateActivityRelateElementsDto
> {
  constructor(activity_relate_elementsService: ActivityRelateElementsService) {
    super(activity_relate_elementsService);
  }

  @Post()
  async post(@Body() createDto: CreateActivityRelateElementsDto) {
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
    @Body() updateDto: UpdateActivityRelateElementsDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
