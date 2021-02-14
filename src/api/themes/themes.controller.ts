import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ThemesService } from './themes.service';
import { CreateThemesDto, UpdateThemesDto } from './themes.dto';
import { BaseController } from '../../base/base.controller';
import { Themes } from './themes.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'themes' })
export class ThemesController extends BaseController<
  Themes,
  CreateThemesDto,
  UpdateThemesDto
> {
  constructor(themesService: ThemesService) {
    super(themesService);
  }

  @Post()
  async post(@Body() createDto: CreateThemesDto) {
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
  async edit(@Param('id') id: string, @Body() updateDto: UpdateThemesDto) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
