import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TransactionStatusService } from './transaction_status.service';
import {
  CreateTransactionStatusDto,
  UpdateTransactionStatusDto,
} from './transaction_status.dto';
import { BaseController } from '../../base/base.controller';
import { TransactionStatus } from './transaction_status.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';

@ControllerApi({ name: 'transaction_status' })
export class TransactionStatusController extends BaseController<
  TransactionStatus,
  CreateTransactionStatusDto,
  UpdateTransactionStatusDto
> {
  constructor(transaction_statusService: TransactionStatusService) {
    super(transaction_statusService);
  }

  @Post()
  async post(@Body() createDto: CreateTransactionStatusDto) {
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
    @Body() updateDto: UpdateTransactionStatusDto,
  ) {
    return await this.update(id, updateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
