import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OrganizationsCertificatesService } from './organizations_certificates.service';
import {
  CreateOrganizationsCertificatesDto,
  UpdateOrganizationsCertificatesDto,
} from './organizations_certificates.dto';
import { BaseController } from '../../base/base.controller';
import { OrganizationsCertificates } from './organizations_certificates.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'organizations_certificates' })
export class OrganizationsCertificatesController extends BaseController<
  OrganizationsCertificates,
  CreateOrganizationsCertificatesDto,
  UpdateOrganizationsCertificatesDto
> {
  constructor(
    organizations_certificatesService: OrganizationsCertificatesService,
  ) {
    super(organizations_certificatesService);
  }

  @Post()
  async post(@Body() createDto: CreateOrganizationsCertificatesDto) {
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
    @Body() updateDto: UpdateOrganizationsCertificatesDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
