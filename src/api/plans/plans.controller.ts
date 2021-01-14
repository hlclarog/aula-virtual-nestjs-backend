import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PlansService } from './plans.service';
import { CreatePlansDto, UpdatePlansDto } from './plans.dto';
import { BaseController } from '../../base/base.controller';
import { Plans } from './plans.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'plans' })
export class PlansController extends BaseController<
  Plans,
  CreatePlansDto,
  UpdatePlansDto
> {
  constructor(plansService: PlansService) {
    super(plansService);
  }

  @Post()
  async post(@Body() createDto: CreatePlansDto) {
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
  async edit(@Param('id') id: string, @Body() updateDto: UpdatePlansDto) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
