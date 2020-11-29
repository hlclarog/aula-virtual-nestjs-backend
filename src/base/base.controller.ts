import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { BaseService } from './base.service';
import { CreateBaseDto, UpdateBaseDto } from './dto/create-base.dto';

@Controller('api/base')
export class BaseController {
  constructor(private readonly baseService: BaseService) {}

  @Post()
  create(@Body() createBaseDto: CreateBaseDto) {
    return this.baseService.create(createBaseDto);
  }

  @Get()
  findAll() {
    return this.baseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.baseService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBaseDto: UpdateBaseDto) {
    return this.baseService.update(+id, updateBaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.baseService.remove(+id);
  }
}
