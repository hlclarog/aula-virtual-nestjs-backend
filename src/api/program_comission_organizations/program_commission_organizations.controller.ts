import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import { BaseController } from '../../base/base.controller';
import { ProgramCommissionOrganizations } from './program_commission_organizations.entity';
import {
  CreateProgramCommissionOrganizationsDto,
  UpdateProgramCommissionOrganizationsDto,
} from './program_commission_organizations.dto';
import { ProgramCommissionOrganizationsService } from './program_commission_organizations.service';
import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';

@ControllerApi({ name: 'program_commission_organizations' })
export class ProgramCommissionOrganizationsController extends BaseController<
  ProgramCommissionOrganizations,
  CreateProgramCommissionOrganizationsDto,
  UpdateProgramCommissionOrganizationsDto
> {
  constructor(
    private programCommissionOrganizationsService: ProgramCommissionOrganizationsService,
  ) {
    super(programCommissionOrganizationsService);
  }

  @Post()
  async post(@Body() createDto: CreateProgramCommissionOrganizationsDto) {
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
    @Body() updateDto: UpdateProgramCommissionOrganizationsDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }

  @Get('program/:id')
  async getByCourse(@Param('id') id: number) {
    const result = await this.programCommissionOrganizationsService.findByCourse(
      id,
    );
    return { data: result };
  }
}
