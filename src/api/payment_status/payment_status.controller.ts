import { Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { PaymentStatusService } from './payment_status.service';
import { BaseController } from '../../base/base.controller';
import { PaymentStatus } from './payment_status.entity';
import { CreatePaymentStatusDto, UpdatePaymentStatusDto } from './payment_status.dto';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'payment_status' })
export class PaymentStatusController extends BaseController<
  PaymentStatus,
  CreatePaymentStatusDto,
  UpdatePaymentStatusDto
> {
  constructor(private readonly payment_statusService: PaymentStatusService) {
    super(payment_statusService);
  }
  @Post()
  async post(@Body() createDto: CreatePaymentStatusDto) {
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
  async edit(@Param('id') id: string, @Body() updateDto: UpdatePaymentStatusDto) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
