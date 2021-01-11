import { Controller, Get, Post, Body, Put, Param, Delete,} from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { BaseController } from '../../base/base.controller';
import { Currencies } from './currency.entity';
import { CreateCurrencyDto, UpdateCurrencyDto } from './currency.dto';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'currencies' })
export class CurrenciesController extends BaseController<
  Currencies,
  CreateCurrencyDto,
  UpdateCurrencyDto
> {
  constructor(private readonly currenciesService: CurrenciesService) {
    super(currenciesService);
  }
  @Post()
  async post(@Body() createDto: CreateCurrencyDto) {
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
  async edit(@Param('id') id: string, @Body() updateDto: UpdateCurrencyDto) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
