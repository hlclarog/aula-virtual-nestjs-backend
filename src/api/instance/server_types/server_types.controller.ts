import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ServerTypesService } from './server_types.service';
import { CreateServerTypesDto, UpdateServerTypesDto } from './server_types.dto';
import { BaseController } from '../../../base/base.controller';
import { ServerTypes } from './server_types.entity';
import { ControllerApi } from '../../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'server_types' })
export class ServerTypesController extends BaseController<
  ServerTypes,
  CreateServerTypesDto,
  UpdateServerTypesDto
> {
  constructor(server_typesService: ServerTypesService) {
    super(server_typesService);
  }

  @Post()
  async post(@Body() createDto: CreateServerTypesDto) {
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
  async edit(@Param('id') id: string, @Body() updateDto: UpdateServerTypesDto) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
