import { Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { BaseService } from './base.service';

export abstract class BaseController<ENTITY, CREATE_DTO, UPDATE_DTO> {
  private service: BaseService<ENTITY, CREATE_DTO, UPDATE_DTO>;
  protected constructor(service) {
    this.service = service;
  }

  @Post()
  async create(@Body() createDto: CREATE_DTO) {
    const result = await this.service.create(createDto);
    return { data: result };
  }

  @Get()
  async findAll() {
    const result = await this.service.findAll();
    return { data: result };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.service.findOne(+id);
    return { data: result };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDto: UPDATE_DTO) {
    const result = await this.service.update(+id, updateDto);
    return { data: result };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.service.remove(+id);
    return { data: result };
  }
}
