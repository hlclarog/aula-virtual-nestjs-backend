import { Body, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { IntegrationTypesService } from './integration_types.service';
import {
  CreateIntegrationTypesDto,
  UpdateIntegrationTypesDto,
} from './integration_types.dto';
import { BaseController } from '../../base/base.controller';
import { IntegrationTypes } from './integration_types.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import {
  INFO_TENANCY_PROVIDER,
  InfoTenancyDomain,
} from './../../utils/providers/info-tenancy.module';

@ControllerApi({ name: 'integration_types' })
export class IntegrationTypesController extends BaseController<
  IntegrationTypes,
  CreateIntegrationTypesDto,
  UpdateIntegrationTypesDto
> {
  constructor(
    @Inject(INFO_TENANCY_PROVIDER) private tenancy: InfoTenancyDomain,
    private integration_typesService: IntegrationTypesService,
  ) {
    super(integration_typesService);
  }

  @Post()
  async post(@Body() createDto: CreateIntegrationTypesDto) {
    createDto.tenancy_id = this.tenancy.id;
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
    @Body() updateDto: UpdateIntegrationTypesDto,
  ) {
    updateDto.tenancy_id = this.tenancy.id;
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
