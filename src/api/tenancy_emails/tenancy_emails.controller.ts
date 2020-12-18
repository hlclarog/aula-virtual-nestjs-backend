import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TenancyEmailsService } from './tenancy_emails.service';
import {
  CreateTenancyEmailsDto,
  UpdateTenancyEmailsDto,
} from './tenancy_emails.dto';
import { BaseController } from '../../base/base.controller';
import { TenancyEmails } from './tenancy_emails.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'tenancy_emails' })
export class TenancyEmailsController extends BaseController<
  TenancyEmails,
  CreateTenancyEmailsDto,
  UpdateTenancyEmailsDto
> {
  constructor(tenancy_emailsService: TenancyEmailsService) {
    super(tenancy_emailsService);
  }

  @Post()
  async post(@Body() createDto: CreateTenancyEmailsDto) {
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
    @Body() updateDto: UpdateTenancyEmailsDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
