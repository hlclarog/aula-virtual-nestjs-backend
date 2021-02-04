import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RelateElementAnswersService } from './relate_element_answers.service';
import {
  CreateRelateElementAnswersDto,
  UpdateRelateElementAnswersDto,
} from './relate_element_answers.dto';
import { BaseController } from '../../base/base.controller';
import { RelateElementAnswers } from './relate_element_answers.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'relate_element_answers' })
export class RelateElementAnswersController extends BaseController<
  RelateElementAnswers,
  CreateRelateElementAnswersDto,
  UpdateRelateElementAnswersDto
> {
  constructor(relate_element_answersService: RelateElementAnswersService) {
    super(relate_element_answersService);
  }

  @Post()
  async post(@Body() createDto: CreateRelateElementAnswersDto) {
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
    @Body() updateDto: UpdateRelateElementAnswersDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
