import { Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ProgramPaymentService } from './program_payment.service';
import { BaseController } from '../../base/base.controller';
import { ProgramPayment } from './program_payment.entity';
import { CreateCurrencyDto, UpdateCurrencyDto } from './program_payment.dto';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'program_payment' })
export class ProgramPaymentController extends BaseController<
  ProgramPayment,
  CreateCurrencyDto,
  UpdateCurrencyDto
> {
  constructor(private readonly program_paymentService: ProgramPaymentService) {
    super(program_paymentService);
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
