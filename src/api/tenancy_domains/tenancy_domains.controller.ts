import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TenancyDomainsService } from './tenancy_domains.service';
import {
  CreateTenancyDomainsDto,
  UpdateTenancyDomainsDto,
} from './tenancy_domains.dto';
import { BaseController } from '../../base/base.controller';
import { TenancyDomains } from './tenancy_domains.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'tenancy_domains' })
export class TenancyDomainsController extends BaseController<
  TenancyDomains,
  CreateTenancyDomainsDto,
  UpdateTenancyDomainsDto
> {
  constructor(tenancy_domainsService: TenancyDomainsService) {
    super(tenancy_domainsService);
  }

  @Post()
  async post(@Body() createDto: CreateTenancyDomainsDto) {
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
    @Body() updateDto: UpdateTenancyDomainsDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
