import { Inject, Injectable } from '@nestjs/common';
import {
  CreatePaymentStatusDto,
  PAYMENT_STATUS_PROVIDER,
  UpdatePaymentStatusDto,
} from './payment_status.dto';
import { BaseService } from '../../base/base.service';
import { PaymentStatus } from './payment_status.entity';
import { BaseRepo } from '../../base/base.repository';

@Injectable()
export class PaymentStatusService extends BaseService<
  PaymentStatus,
  CreatePaymentStatusDto,
  UpdatePaymentStatusDto
> {
  @Inject(PAYMENT_STATUS_PROVIDER) repository: BaseRepo<PaymentStatus>;
}
