import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRolesDto, UpdateRolesDto } from './roles.dto';
import { BaseController } from '../../../base/base.controller';
import { Roles } from './roles.entity';
import { ControllerApi } from '../../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'roles' })
export class RolesController extends BaseController<
  Roles,
  CreateRolesDto,
  UpdateRolesDto
> {
  constructor(private rolesService: RolesService) {
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

  @Get('/menu/fuse')
  async menu() {
    const result = await this.rolesService.menuUser();
    return { data: result };
  }
}
