import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PositionsService } from './positions.service';
import { CreatePositionsDto, UpdatePositionsDto } from './positions.dto';
import { BaseController } from '../../base/base.controller';
import { Positions } from './positions.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'positions' })
export class PositionsController extends BaseController<
  Positions,
  CreatePositionsDto,
  UpdatePositionsDto
> {
  constructor(positionsService: PositionsService) {
    super(positionsService);
  }

  @Post()
  async post(@Body() createDto: CreatePositionsDto) {
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
  async edit(@Param('id') id: string, @Body() updateDto: UpdatePositionsDto) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
