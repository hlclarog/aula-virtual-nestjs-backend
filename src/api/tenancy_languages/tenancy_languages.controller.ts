import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TenancyLanguagesService } from './tenancy_languages.service';
import {
  CreateTenancyLanguagesDto,
  UpdateTenancyLanguagesDto,
} from './tenancy_languages.dto';
import { BaseController } from '../../base/base.controller';
import { TenancyLanguages } from './tenancy_languages.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tenancy_languages')
@Controller('/api/tenancy_languages')
export class TenancyLanguagesController extends BaseController<
  TenancyLanguages,
  CreateTenancyLanguagesDto,
  UpdateTenancyLanguagesDto
> {
  constructor(tenancy_languagesService: TenancyLanguagesService) {
    super(tenancy_languagesService);
  }

  @Post()
  async post(@Body() createDto: CreateTenancyLanguagesDto) {
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
  async edit(@Param('id') id: string, @Body() updateDto: UpdateTenancyLanguagesDto) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
