import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProgramComissionOrganizationsService } from './program_comission_organizations.service';
import {
  CreateProgramComissionOrganizationsDto,
  UpdateProgramComissionOrganizationsDto,
} from './program_comission_organizations.dto';
import { BaseController } from '../../base/base.controller';
import { ProgramComissionOrganizations } from './program_comission_organizations.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'program_comission_organizations' })
export class ProgramComissionOrganizationsController extends BaseController<
  ProgramComissionOrganizations,
  CreateProgramComissionOrganizationsDto,
  UpdateProgramComissionOrganizationsDto
> {
  constructor(program_comission_organizationsService: ProgramComissionOrganizationsService) {
    super(program_comission_organizationsService);
  }

  @Post()
  async post(@Body() createDto: CreateProgramComissionOrganizationsDto) {
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
    @Body() updateDto: UpdateProgramComissionOrganizationsDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
