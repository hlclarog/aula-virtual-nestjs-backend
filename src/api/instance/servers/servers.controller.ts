import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ServersService } from './servers.service';
import { CreateServersDto, UpdateServersDto } from './servers.dto';
import { BaseController } from '../../../base/base.controller';
import { Servers } from './servers.entity';
import { ControllerApi } from '../../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'servers' })
export class ServersController extends BaseController<
  Servers,
  CreateServersDto,
  UpdateServersDto
> {
  constructor(serversService: ServersService) {
    super(serversService);
  }

  @Post()
  async post(@Body() createDto: CreateServersDto) {
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
  async edit(@Param('id') id: string, @Body() updateDto: UpdateServersDto) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
