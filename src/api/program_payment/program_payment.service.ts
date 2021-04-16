import { Inject, Injectable } from '@nestjs/common';
import {
  CreateProgramPaymentDto,
  PROGRAM_PAYMENT_PROVIDER,
  UpdateProgramPaymentDto,
} from './program_payment.dto';
import { BaseService } from '../../base/base.service';
import { ProgramPayment } from './program_payment.entity';
import { BaseRepo } from '../../base/base.repository';

@Injectable()
export class ProgramPaymentService extends BaseService<
  ProgramPayment,
  CreateProgramPaymentDto,
  UpdateProgramPaymentDto
> {
  @Inject(PROGRAM_PAYMENT_PROVIDER) repository: BaseRepo<ProgramPayment>;
}
