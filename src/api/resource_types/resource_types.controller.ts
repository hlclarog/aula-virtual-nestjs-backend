import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ResourceTypesService } from './resource_types.service';
import {
  CreateResourceTypesDto,
  UpdateResourceTypesDto,
} from './resource_types.dto';
import { BaseController } from '../../base/base.controller';
import { ResourceTypes } from './resource_types.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'resource_types' })
export class ResourceTypesController extends BaseController<
  ResourceTypes,
  CreateResourceTypesDto,
  UpdateResourceTypesDto
> {
  constructor(resource_typesService: ResourceTypesService) {
    super(resource_typesService);
  }

  @Post()
  async post(@Body() createDto: CreateResourceTypesDto) {
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
    @Body() updateDto: UpdateResourceTypesDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
