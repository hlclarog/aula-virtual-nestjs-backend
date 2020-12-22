import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ConnectionTypesService } from './connection_types.service';
import {
  CreateConnectionTypesDto,
  UpdateConnectionTypesDto,
} from './connection_types.dto';
import { BaseController } from '../../../base/base.controller';
import { ConnectionTypes } from './connection_types.entity';
import { ControllerApi } from '../../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'connection_types' })
export class ConnectionTypesController extends BaseController<
  ConnectionTypes,
  CreateConnectionTypesDto,
  UpdateConnectionTypesDto
> {
  constructor(connection_typesService: ConnectionTypesService) {
    super(connection_typesService);
  }

  @Post()
  async post(@Body() createDto: CreateConnectionTypesDto) {
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
    @Body() updateDto: UpdateConnectionTypesDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
