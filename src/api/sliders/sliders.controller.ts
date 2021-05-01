import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SlidersService } from './sliders.service';
import { CreateSlidersDto, UpdateSlidersDto } from './sliders.dto';
import { BaseController } from '../../base/base.controller';
import { Sliders } from './sliders.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'sliders' })
export class SlidersController extends BaseController<
  Sliders,
  CreateSlidersDto,
  UpdateSlidersDto
> {
  constructor(slidersService: SlidersService) {
    super(slidersService);
  }

  @Post()
  async post(@Body() createDto: CreateSlidersDto) {
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
  async edit(@Param('id') id: string, @Body() updateDto: UpdateSlidersDto) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
