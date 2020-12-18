import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { CreateLanguagesDto, UpdateLanguagesDto } from './languages.dto';
import { BaseController } from '../../base/base.controller';
import { Languages } from './languages.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'languages' })
export class LanguagesController extends BaseController<
  Languages,
  CreateLanguagesDto,
  UpdateLanguagesDto
> {
  constructor(languagesService: LanguagesService) {
    super(languagesService);
  }

  @Post()
  async post(@Body() createDto: CreateLanguagesDto) {
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
  async edit(@Param('id') id: string, @Body() updateDto: UpdateLanguagesDto) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
