import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RolesPermissionsService } from './roles_permissions.service';
import {
  CreateRolesPermissionsDto,
  UpdateRolesPermissionsDto,
} from './roles_permissions.dto';
import { BaseController } from '../../../base/base.controller';
import { RolesPermissions } from './roles_permissions.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('roles_permissions')
@Controller('/api/roles_permissions')
export class RolesPermissionsController extends BaseController<
  RolesPermissions,
  CreateRolesPermissionsDto,
  UpdateRolesPermissionsDto
> {
  constructor(roles_permissionsService: RolesPermissionsService) {
    super(roles_permissionsService);
  }

  @Post()
  async post(@Body() createDto: CreateRolesPermissionsDto) {
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
  async edit(@Param('id') id: string, @Body() updateDto: UpdateRolesPermissionsDto) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
