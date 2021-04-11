import { Inject, Injectable } from '@nestjs/common';
import {
  CreateCurrencyDto,
  PAYMENTS_PROVIDER,
  UpdateCurrencyDto,
} from './payments.dto';
import { BaseService } from '../../base/base.service';
import { Payments } from './payments.entity';
import { BaseRepo } from '../../base/base.repository';

@Injectable()
export class PaymentsService extends BaseService<
  Payments,
  CreateCurrencyDto,
  UpdateCurrencyDto
> {
  @Inject(PAYMENTS_PROVIDER) repository: BaseRepo<Payments>;
}
