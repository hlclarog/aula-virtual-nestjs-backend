import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PointReasonsService } from './point_reasons.service';
import {
  CreatePointReasonsDto,
  UpdatePointReasonsDto,
} from './point_reasons.dto';
import { BaseController } from '../../base/base.controller';
import { PointReasons } from './point_reasons.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'point_reasons' })
export class PointReasonsController extends BaseController<
  PointReasons,
  CreatePointReasonsDto,
  UpdatePointReasonsDto
> {
  constructor(point_reasonsService: PointReasonsService) {
    super(point_reasonsService);
  }

  @Post()
  async post(@Body() createDto: CreatePointReasonsDto) {
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
    @Body() updateDto: UpdatePointReasonsDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
