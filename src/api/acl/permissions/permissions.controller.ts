import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionsDto, UpdatePermissionsDto } from './permissions.dto';
import { BaseController } from '../../../base/base.controller';
import { Permissions } from './permissions.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('permissions')
@Controller('/api/permissions')
export class PermissionsController extends BaseController<
  Permissions,
  CreatePermissionsDto,
  UpdatePermissionsDto
> {
  constructor(permissionsService: PermissionsService) {
    super(permissionsService);
  }

  @Post()
  async post(@Body() createDto: CreatePermissionsDto) {
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
  async edit(@Param('id') id: string, @Body() updateDto: UpdatePermissionsDto) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
