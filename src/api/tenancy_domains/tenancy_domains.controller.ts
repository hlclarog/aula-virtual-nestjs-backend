import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TenancyDomainsService } from './tenancy_domains.service';
import {
  CreateTenancyDomainsDto,
  UpdateTenancyDomainsDto,
} from './tenancy_domains.dto';
import { BaseController } from '../../base/base.controller';
import { TenancyDomains } from './tenancy_domains.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('tenancy_domains')
@Controller('/api/tenancy_domains')
export class TenancyDomainsController extends BaseController<
  TenancyDomains,
  CreateTenancyDomainsDto,
  UpdateTenancyDomainsDto
> {
  constructor(tenancy_domainsService: TenancyDomainsService) {
    super(tenancy_domainsService);
  }

  @Post()
  // TODO Asi se adiciona la description personalizada del servicio
  @ApiOperation({
    description: 'Asi se adiciona la description personalizada del servicio',
  })
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
  async edit(@Param('id') id: string, @Body() updateDto: UpdateTenancyDomainsDto) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
