import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PlanModulesService } from './plan_modules.service';
import { CreatePlanModulesDto, UpdatePlanModulesDto } from './plan_modules.dto';
import { BaseController } from '../../base/base.controller';
import { PlanModules } from './plan_modules.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'plan_modules' })
export class PlanModulesController extends BaseController<
  PlanModules,
  CreatePlanModulesDto,
  UpdatePlanModulesDto
> {
  constructor(plan_modulesService: PlanModulesService) {
    super(plan_modulesService);
  }

  @Post()
  async post(@Body() createDto: CreatePlanModulesDto) {
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
  async edit(@Param('id') id: string, @Body() updateDto: UpdatePlanModulesDto) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
