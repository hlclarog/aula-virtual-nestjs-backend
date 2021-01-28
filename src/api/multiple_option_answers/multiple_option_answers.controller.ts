import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MultipleOptionAnswersService } from './multiple_option_answers.service';
import {
  CreateMultipleOptionAnswersDto,
  UpdateMultipleOptionAnswersDto,
} from './multiple_option_answers.dto';
import { BaseController } from '../../base/base.controller';
import { MultipleOptionAnswers } from './multiple_option_answers.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'multiple_option_answers' })
export class MultipleOptionAnswersController extends BaseController<
  MultipleOptionAnswers,
  CreateMultipleOptionAnswersDto,
  UpdateMultipleOptionAnswersDto
> {
  constructor(multiple_option_answersService: MultipleOptionAnswersService) {
    super(multiple_option_answersService);
  }

  @Post()
  async post(@Body() createDto: CreateMultipleOptionAnswersDto) {
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
    @Body() updateDto: UpdateMultipleOptionAnswersDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
