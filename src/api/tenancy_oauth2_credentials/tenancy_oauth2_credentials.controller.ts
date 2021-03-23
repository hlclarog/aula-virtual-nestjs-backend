import { Body, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { TenancyOauth2CredentialsService } from './tenancy_oauth2_credentials.service';
import {
  CreateTenancyOauth2CredentialsDto,
  UpdateTenancyOauth2CredentialsDto,
} from './tenancy_oauth2_credentials.dto';
import { BaseController } from '../../base/base.controller';
import { TenancyOauth2Credentials } from './tenancy_oauth2_credentials.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'tenancy_oauth2_credentials' })
export class TenancyOauth2CredentialsController extends BaseController<
  TenancyOauth2Credentials,
  CreateTenancyOauth2CredentialsDto,
  UpdateTenancyOauth2CredentialsDto
> {
  constructor(
    // @Inject(INFO_TENANCY_PROVIDER) private tenancy: InfoTenancyDomain,
    private tenancy_oauth2_credentialsService: TenancyOauth2CredentialsService,
  ) {
    super(tenancy_oauth2_credentialsService);
  }

  @Post()
  async post(@Body() createDto: CreateTenancyOauth2CredentialsDto) {
    // createDto.tenancy_id = this.tenancy.id;
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

  @Get('tenancy/:id')
  async findByTenancy(@Param('id') id: number) {
    return await this.tenancy_oauth2_credentialsService.findByTenancy(id);
  }

  @Put(':id')
  async edit(
    @Param('id') id: string,
    @Body() updateDto: UpdateTenancyOauth2CredentialsDto,
  ) {
    // updateDto.tenancy_id = this.tenancy.id;
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
