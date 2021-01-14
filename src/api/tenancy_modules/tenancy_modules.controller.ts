import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TenancyModulesService } from './tenancy_modules.service';
import {
  CreateTenancyModulesDto,
  UpdateTenancyModulesDto,
} from './tenancy_modules.dto';
import { BaseController } from '../../base/base.controller';
import { TenancyModules } from './tenancy_modules.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'tenancy_modules' })
export class TenancyModulesController extends BaseController<
  TenancyModules,
  CreateTenancyModulesDto,
  UpdateTenancyModulesDto
> {
  constructor(tenancy_modulesService: TenancyModulesService) {
    super(tenancy_modulesService);
  }

  @Post()
  async post(@Body() createDto: CreateTenancyModulesDto) {
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
    @Body() updateDto: UpdateTenancyModulesDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
