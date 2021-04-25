import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DependenciesService } from './dependencies.service';
import {
  CreateDependenciesDto,
  UpdateDependenciesDto,
} from './dependencies.dto';
import { BaseController } from '../../base/base.controller';
import { Dependencies } from './dependencies.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'dependencies' })
export class DependenciesController extends BaseController<
  Dependencies,
  CreateDependenciesDto,
  UpdateDependenciesDto
> {
  constructor(dependenciesService: DependenciesService) {
    super(dependenciesService);
  }

  @Post()
  async post(@Body() createDto: CreateDependenciesDto) {
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
    @Body() updateDto: UpdateDependenciesDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
