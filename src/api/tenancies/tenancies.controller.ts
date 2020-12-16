import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TenanciesService } from './tenancies.service';
import { CreateTenanciesDto, UpdateTenanciesDto } from './tenancies.dto';
import { BaseController } from '../../base/base.controller';
import { Tenancies } from './tenancies.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('tenancies')
@Controller('/api/tenancies')
export class TenanciesController extends BaseController<
  Tenancies,
  CreateTenanciesDto,
  UpdateTenanciesDto
> {
  constructor(tenanciesService: TenanciesService) {
    super(tenanciesService);
  }

  @Post()
  // TODO Asi se adiciona la description personalizada del servicio
  @ApiOperation({
    description: 'Asi se adiciona la description personalizada del servicio',
  })
  async post(@Body() createDto: CreateTenanciesDto) {
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
  async edit(@Param('id') id: string, @Body() updateDto: UpdateTenanciesDto) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
