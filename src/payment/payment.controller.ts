import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

import { PaymentService } from './payment.service';
import { IpayuConfirmation, IPayuResponse } from './payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Get('web_checkout/payu/:subDomain/response')
  async payuResponse(
    @Query() input: IPayuResponse,
    @Param('subDomain') subDomain: string,
  ) {
    await this.paymentService.payuResponse(input, subDomain);
  }

  @Post('web_checkout/payu/:subDomain/confirmation')
  async payuConfirmation(@Body() input: IpayuConfirmation, @Param('subDomain') subDomain: string ) {
    const result = await this.paymentService.payuConfirmation(input, subDomain);
    return { data: result };
  }
}
