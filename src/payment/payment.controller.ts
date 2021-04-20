import { Controller, Get, Param, Query } from '@nestjs/common';

import { PaymentService } from './payment.service';
import { IPayuResponse } from './payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Get('web_checkout/payu/:subDomain/response')
  async payuResponse(
    @Query() input: IPayuResponse,
    @Param('subDomain') subDomain: string,
  ) {
    console.log('***************** response *****************');
    console.log(input);
    await this.paymentService.payuResponse(input, subDomain);
  }

  @Get('web_checkout/payu/:subDomain/confirmation')
  async payuConfirmation(@Query() input) {
    console.log('***************** confirmation*****************');
    console.log(input);
  }
}
