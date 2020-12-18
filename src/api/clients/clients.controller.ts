import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientsDto, UpdateClientsDto } from './clients.dto';
import { BaseController } from '../../base/base.controller';
import { Clients } from './clients.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'clients' })
export class ClientsController extends BaseController<
  Clients,
  CreateClientsDto,
  UpdateClientsDto
> {
  constructor(clientsService: ClientsService) {
    super(clientsService);
  }

  @Post()
  async post(@Body() createDto: CreateClientsDto) {
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
  async edit(@Param('id') id: string, @Body() updateDto: UpdateClientsDto) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
