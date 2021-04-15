import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserOrganizationsService } from './user_organizations.service';
import {
  CreateUserOrganizationsDto,
  UpdateUserOrganizationsDto,
} from './user_organizations.dto';
import { BaseController } from '../../base/base.controller';
import { UserOrganizations } from './user_organizations.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'user_organizations' })
export class UserOrganizationsController extends BaseController<
  UserOrganizations,
  CreateUserOrganizationsDto,
  UpdateUserOrganizationsDto
> {
  constructor(protected user_organizationsService: UserOrganizationsService) {
    super(user_organizationsService);
  }

  @Post()
  async post(@Body() createDto: CreateUserOrganizationsDto) {
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
    @Body() updateDto: UpdateUserOrganizationsDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
