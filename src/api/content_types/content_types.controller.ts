import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ContentTypesService } from './content_types.service';
import {
  CreateContentTypesDto,
  UpdateContentTypesDto,
} from './content_types.dto';
import { BaseController } from '../../base/base.controller';
import { ContentTypes } from './content_types.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'content_types' })
export class ContentTypesController extends BaseController<
  ContentTypes,
  CreateContentTypesDto,
  UpdateContentTypesDto
> {
  constructor(content_typesService: ContentTypesService) {
    super(content_typesService);
  }

  @Post()
  async post(@Body() createDto: CreateContentTypesDto) {
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
    @Body() updateDto: UpdateContentTypesDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
