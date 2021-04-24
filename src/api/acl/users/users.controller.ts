import { Body, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto, searchByRol, UpdateUsersDto } from './users.dto';
import { BaseController } from '../../../base/base.controller';
import { Users } from './users.entity';
import { ControllerApi } from '../../../utils/decorators/controllers.decorator';
import {
  INFO_USER_PROVIDER,
  InfoUserProvider,
} from '../../../utils/providers/info-user.module';
import { TenancyConfigService } from './../../tenancy_config/tenancy_config.service';
import {
  INFO_TENANCY_PROVIDER,
  InfoTenancyDomain,
} from './../../../utils/providers/info-tenancy.module';

@ControllerApi({ name: 'users' })
export class UsersController extends BaseController<
  Users,
  CreateUsersDto,
  UpdateUsersDto
> {
  constructor(
    private usersService: UsersService,
    private tenancyConfigService: TenancyConfigService,
    @Inject(INFO_USER_PROVIDER) private infoUser: InfoUserProvider,
    @Inject(INFO_TENANCY_PROVIDER) private tenancy: InfoTenancyDomain,
  ) {
    super(usersService);
  }

  @Post()
  async post(@Body() createDto: CreateUsersDto) {
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

  @Get('rol/:code')
  async findForRol(@Param('code') code: string) {
    const result = await this.usersService.findForRol(code);
    return { data: result };
  }

  @Put(':id')
  async edit(@Param('id') id: string, @Body() updateDto: UpdateUsersDto) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }

  @Post('search/byRol')
  async searchByRol(@Body() body: searchByRol) {
    const result = await this.usersService.searchByRol(body.idRol, body.text);
    return {
      data: result,
    };
  }

  @Post('search/teacher')
  async searchTeacher(@Body() body: searchByRol) {
    const result = await this.usersService.searchByRol(2, body.text);
    return {
      data: result,
    };
  }

  @Get('profile/info')
  async profile() {
    const config = await this.tenancyConfigService.findOne(this.tenancy.id);
    const result = await this.usersService.profile();
    return {
      data: {
        ...result,
        tenancy: config,
      },
    };
  }

  @Put('/profile/info')
  async editProfile(@Body() updateDto: UpdateUsersDto) {
    return await this.update(this.infoUser.id.toString(), updateDto);
  }
}
