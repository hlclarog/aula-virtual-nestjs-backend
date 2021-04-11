import { Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { BaseController } from '../../base/base.controller';
import { Payments } from './payments.entity';
import { AddExternalCollection, CreateCurrencyDto, UpdateCurrencyDto } from './payments.dto';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'payments' })
export class PaymentsController extends BaseController<
  Payments,
  CreateCurrencyDto,
  UpdateCurrencyDto
> {
  constructor(private readonly paymentsService: PaymentsService) {
    super(paymentsService);
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

  @Post('/external/collection')
  async externalCollection(@Body() input: AddExternalCollection) {
    const response = await this.paymentsService.externalCollection(input);
    return { data: response };
  }
}
