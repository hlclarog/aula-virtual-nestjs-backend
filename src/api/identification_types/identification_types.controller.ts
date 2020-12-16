import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { IdentificationTypesService } from './identification_types.service';
import {
  CreateIdentificationTypesDto,
  UpdateIdentificationTypesDto,
} from './identification_types.dto';
import { BaseController } from '../../base/base.controller';
import { IdentificationTypes } from './identification_types.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('identification_types')
@Controller('/api/identification_types')
export class IdentificationTypesController extends BaseController<
  IdentificationTypes,
  CreateIdentificationTypesDto,
  UpdateIdentificationTypesDto
> {
  constructor(identification_typesService: IdentificationTypesService) {
    super(identification_typesService);
  }

  @Post()
  // TODO Asi se adiciona la description personalizada del servicio
  @ApiOperation({
    description: 'Asi se adiciona la description personalizada del servicio',
  })
  async post(@Body() createDto: CreateIdentificationTypesDto) {
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
  async edit(@Param('id') id: string, @Body() updateDto: UpdateIdentificationTypesDto) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
