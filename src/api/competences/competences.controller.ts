import { Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CompetencesService } from './competences.service';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import { BaseController } from '../../base/base.controller';
import { Competence } from './competence.entity';
import { CreateCompentenceDto, UpdateCompetenceDto } from './competences.dto';
@ControllerApi({ name: 'competences' })
export class CompetencesController extends BaseController<
  Competence,
  CreateCompentenceDto,
  UpdateCompetenceDto
> {
  constructor(private readonly compentencesService: CompetencesService) {
    super(compentencesService);
  }

  @Post()
  async post(@Body() createDto: CreateCompentenceDto) {
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
  async edit(@Param('id') id: string, @Body() updateDto: UpdateCompetenceDto) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.remove(id);
  }
}
