import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersOrganizationsService } from './users_organizations.service';
import {
  CreateUsersOrganizationsDto,
  UpdateUsersOrganizationsDto,
} from './users_organizations.dto';
import { BaseController } from '../../base/base.controller';
import { UsersOrganizations } from './users_organizations.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'users_organizations' })
export class UsersOrganizationsController extends BaseController<
  UsersOrganizations,
  CreateUsersOrganizationsDto,
  UpdateUsersOrganizationsDto
> {
  constructor(protected users_organizationsService: UsersOrganizationsService) {
    super(users_organizationsService);
  }

  @Post()
  async post(@Body() createDto: CreateUsersOrganizationsDto) {
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
    @Body() updateDto: UpdateUsersOrganizationsDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
