import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PositionCompetencesService } from './position_competences.service';
import {
  CreatePositionCompetencesDto,
  UpdatePositionCompetencesDto,
} from './position_competences.dto';
import { BaseController } from '../../base/base.controller';
import { PositionCompetences } from './position_competences.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'position_competences' })
export class PositionCompetencesController extends BaseController<
  PositionCompetences,
  CreatePositionCompetencesDto,
  UpdatePositionCompetencesDto
> {
  constructor(
    protected position_competencesService: PositionCompetencesService,
  ) {
    super(position_competencesService);
  }

  @Post()
  async post(@Body() createDto: CreatePositionCompetencesDto) {
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
    @Body() updateDto: UpdatePositionCompetencesDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
