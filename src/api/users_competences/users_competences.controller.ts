import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersCompetencesService } from './users_competences.service';
import {
  CreateUsersCompetencesDto,
  UpdateUsersCompetencesDto,
} from './users_competences.dto';
import { BaseController } from '../../base/base.controller';
import { UsersCompetences } from './users_competences.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'users_competences' })
export class UsersCompetencesController extends BaseController<
  UsersCompetences,
  CreateUsersCompetencesDto,
  UpdateUsersCompetencesDto
> {
  constructor(protected users_competencesService: UsersCompetencesService) {
    super(users_competencesService);
  }

  @Post()
  async post(@Body() createDto: CreateUsersCompetencesDto) {
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
    @Body() updateDto: UpdateUsersCompetencesDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
