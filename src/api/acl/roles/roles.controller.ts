import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRolesDto, UpdateRolesDto } from './roles.dto';
import { BaseController } from '../../../base/base.controller';
import { Roles } from './roles.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('roles')
@Controller('/api/roles')
export class RolesController extends BaseController<
  Roles,
  CreateRolesDto,
  UpdateRolesDto
> {
  constructor(rolesService: RolesService) {
    super(rolesService);
  }

  @Post()
  async post(@Body() createDto: CreateRolesDto) {
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
  async edit(@Param('id') id: string, @Body() updateDto: UpdateRolesDto) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
