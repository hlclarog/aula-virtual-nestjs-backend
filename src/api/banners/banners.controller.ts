import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BannersService } from './banners.service';
import { CreateBannersDto, UpdateBannersDto } from './banners.dto';
import { BaseController } from '../../base/base.controller';
import { Banners } from './banners.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'banners' })
export class BannersController extends BaseController<
  Banners,
  CreateBannersDto,
  UpdateBannersDto
> {
  constructor(bannersService: BannersService) {
    super(bannersService);
  }

  @Post()
  async post(@Body() createDto: CreateBannersDto) {
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
  async edit(@Param('id') id: string, @Body() updateDto: UpdateBannersDto) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
