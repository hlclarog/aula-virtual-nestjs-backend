import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersRolesService } from './users_roles.service';
import { CreateUsersRolesDto, UpdateUsersRolesDto } from './users_roles.dto';
import { BaseController } from '../../../base/base.controller';
import { UsersRoles } from './users_roles.entity';
import { ControllerApi } from './../../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'users_roles' })
export class UsersRolesController extends BaseController<
  UsersRoles,
  CreateUsersRolesDto,
  UpdateUsersRolesDto
> {
  constructor(users_rolesService: UsersRolesService) {
    super(users_rolesService);
  }

  @Post()
  async post(@Body() createDto: CreateUsersRolesDto) {
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
  async edit(@Param('id') id: string, @Body() updateDto: UpdateUsersRolesDto) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
