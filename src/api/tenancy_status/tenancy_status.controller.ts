import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TenancyStatusService } from './tenancy_status.service';
import {
  CreateTenancyStatusDto,
  UpdateTenancyStatusDto,
} from './tenancy_status.dto';
import { BaseController } from '../../base/base.controller';
import { TenancyStatus } from './tenancy_status.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tenancy_status')
@Controller('/api/tenancy_status')
export class TenancyStatusController extends BaseController<
  TenancyStatus,
  CreateTenancyStatusDto,
  UpdateTenancyStatusDto
> {
  constructor(tenancy_statusService: TenancyStatusService) {
    super(tenancy_statusService);
  }

  @Post()
  async post(@Body() createDto: CreateTenancyStatusDto) {
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
  async edit(@Param('id') id: string, @Body() updateDto: UpdateTenancyStatusDto) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
