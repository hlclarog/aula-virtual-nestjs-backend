import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ActivityIdentifyWordsService } from './activity_identify_words.service';
import {
  CreateActivityIdentifyWordsDto,
  UpdateActivityIdentifyWordsDto,
} from './activity_identify_words.dto';
import { BaseController } from '../../base/base.controller';
import { ActivityIdentifyWords } from './activity_identify_words.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'activity_identify_words' })
export class ActivityIdentifyWordsController extends BaseController<
  ActivityIdentifyWords,
  CreateActivityIdentifyWordsDto,
  UpdateActivityIdentifyWordsDto
> {
  constructor(activity_identify_wordsService: ActivityIdentifyWordsService) {
    super(activity_identify_wordsService);
  }

  @Post()
  async post(@Body() createDto: CreateActivityIdentifyWordsDto) {
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
    @Body() updateDto: UpdateActivityIdentifyWordsDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
