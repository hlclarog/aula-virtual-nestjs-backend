import { Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { BaseService } from './base.service';
import { Base } from './base.entity';

export abstract class BaseController<C, U> {
  private service: BaseService<Base, C, U>;
  protected constructor(service) {
    this.service = service;
  }

  @Post()
  create(@Body() createDto: C) {
    return this.service.create(createDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDto: U) {
    return this.service.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
