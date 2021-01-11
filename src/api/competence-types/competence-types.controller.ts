import { Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CompetenceTypesService } from './competence-types.service';
import {
  CreateCompetenceTypeDto,
  UpdateCompetenceTypeDto,
} from './competence-types.dto';
import { BaseController } from '../../base/base.controller';
import { CompetenceType } from './competence-type.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'competence-types' })
export class CompetenceTypesController extends BaseController<
  CompetenceType,
  CreateCompetenceTypeDto,
  UpdateCompetenceTypeDto
> {
  constructor(private readonly competenceTypesService: CompetenceTypesService) {
    super(competenceTypesService);
  }

  @Post()
  async post(@Body() createDto: CreateCompetenceTypeDto) {
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
    @Body() updateDto: UpdateCompetenceTypeDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.remove(id);
  }
}
