import { Inject, Injectable } from '@nestjs/common';
import {
  CreateCurrencyDto,
  PAYMENT_STATUS_PROVIDER,
  UpdateCurrencyDto,
} from './payment_status.dto';
import { BaseService } from '../../base/base.service';
import { PaymentStatus } from './payment_status.entity';
import { BaseRepo } from '../../base/base.repository';

@Injectable()
export class PaymentStatusService extends BaseService<
  PaymentStatus,
  CreateCurrencyDto,
  UpdateCurrencyDto
> {
  @Inject(PAYMENT_STATUS_PROVIDER) repository: BaseRepo<PaymentStatus>;
}
