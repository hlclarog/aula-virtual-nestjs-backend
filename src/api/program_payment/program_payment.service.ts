import { Inject, Injectable } from '@nestjs/common';
import {
  CreateCurrencyDto,
  PROGRAM_PAYMENT_PROVIDER,
  UpdateCurrencyDto,
} from './program_payment.dto';
import { BaseService } from '../../base/base.service';
import { ProgramPayment } from './program_payment.entity';
import { BaseRepo } from '../../base/base.repository';

@Injectable()
export class ProgramPaymentService extends BaseService<
  ProgramPayment,
  CreateCurrencyDto,
  UpdateCurrencyDto
> {
  @Inject(PROGRAM_PAYMENT_PROVIDER) repository: BaseRepo<ProgramPayment>;
}
