import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { InterestAreasService } from './interest_areas.service';
import {
  CreateInterestAreasDto,
  UpdateInterestAreasDto,
} from './interest_areas.dto';
import { BaseController } from '../../base/base.controller';
import { InterestAreas } from './interest_areas.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'interest_areas' })
export class InterestAreasController extends BaseController<
  InterestAreas,
  CreateInterestAreasDto,
  UpdateInterestAreasDto
> {
  constructor(interest_areasService: InterestAreasService) {
    super(interest_areasService);
  }

  @Post()
  async post(@Body() createDto: CreateInterestAreasDto) {
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
    @Body() updateDto: UpdateInterestAreasDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
