import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TenanciesService } from './tenancies.service';
import {
  CreateKeysOauthServerDto,
  CreateTenanciesDto,
  UpdateTenanciesDto,
} from './tenancies.dto';
import { BaseController } from '../../base/base.controller';
import { Tenancies } from './tenancies.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import { CreateClientHandler } from 'nestjs-oauth2-server';

@ControllerApi({ name: 'tenancies' })
export class TenanciesController extends BaseController<
  Tenancies,
  CreateTenanciesDto,
  UpdateTenanciesDto
> {
  constructor(
    private tenanciesService: TenanciesService,
    private clientHandlerOauth2: CreateClientHandler,
  ) {
    super(tenanciesService);
  }

  @Post()
  async post(@Body() createDto: CreateTenanciesDto) {
    return await this.create(createDto);
  }

  @Get()
  async fetchAll() {
    return await this.findAll();
  }

  @Get('process/status')
  async processStaus() {
    return await this.tenanciesService.processStaus();
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.findOne(id);
  }

  @Put(':id')
  async edit(@Param('id') id: string, @Body() updateDto: UpdateTenanciesDto) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }

  @Post('client_oauth')
  async createClient(@Body() data: CreateKeysOauthServerDto) {
    return await this.clientHandlerOauth2.execute({
      name: data.name,
      scope: data.scope,
      grants: data.grants,
    });
  }

  @Get('clients/oauth')
  async findClientsOAuth2() {
    return await this.clientHandlerOauth2.findAll();
  }
}
