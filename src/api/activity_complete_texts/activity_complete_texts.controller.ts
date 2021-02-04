import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ActivityCompleteTextsService } from './activity_complete_texts.service';
import {
  CreateActivityCompleteTextsDto,
  UpdateActivityCompleteTextsDto,
} from './activity_complete_texts.dto';
import { BaseController } from '../../base/base.controller';
import { ActivityCompleteTexts } from './activity_complete_texts.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'activity_complete_texts' })
export class ActivityCompleteTextsController extends BaseController<
  ActivityCompleteTexts,
  CreateActivityCompleteTextsDto,
  UpdateActivityCompleteTextsDto
> {
  constructor(activity_complete_textsService: ActivityCompleteTextsService) {
    super(activity_complete_textsService);
  }

  @Post()
  async post(@Body() createDto: CreateActivityCompleteTextsDto) {
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
    @Body() updateDto: UpdateActivityCompleteTextsDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
