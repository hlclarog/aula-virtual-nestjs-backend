import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SortItemAnswersService } from './sort_item_answers.service';
import {
  CreateSortItemAnswersDto,
  UpdateSortItemAnswersDto,
} from './sort_item_answers.dto';
import { BaseController } from '../../base/base.controller';
import { SortItemAnswers } from './sort_item_answers.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'sort_item_answers' })
export class SortItemAnswersController extends BaseController<
  SortItemAnswers,
  CreateSortItemAnswersDto,
  UpdateSortItemAnswersDto
> {
  constructor(sort_item_answersService: SortItemAnswersService) {
    super(sort_item_answersService);
  }

  @Post()
  async post(@Body() createDto: CreateSortItemAnswersDto) {
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
    @Body() updateDto: UpdateSortItemAnswersDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
