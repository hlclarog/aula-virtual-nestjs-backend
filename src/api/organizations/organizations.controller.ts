import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import {
  CreateOrganizationsDto,
  UpdateOrganizationsDto,
} from './organizations.dto';
import { BaseController } from '../../base/base.controller';
import { Organizations } from './organizations.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'organizations' })
export class OrganizationsController extends BaseController<
  Organizations,
  CreateOrganizationsDto,
  UpdateOrganizationsDto
> {
  constructor(organizationsService: OrganizationsService) {
    super(organizationsService);
  }

  @Post()
  async post(@Body() createDto: CreateOrganizationsDto) {
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
    @Body() updateDto: UpdateOrganizationsDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
