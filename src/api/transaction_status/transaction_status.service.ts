import { Inject, Injectable } from '@nestjs/common';
import {
  CreateTransactionStatusDto,
  UpdateTransactionStatusDto,
  TRANSACTION_STATUS_PROVIDER,
} from './transaction_status.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { TransactionStatus } from './transaction_status.entity';

@Injectable()
export class TransactionStatusService extends BaseService<
  TransactionStatus,
  CreateTransactionStatusDto,
  UpdateTransactionStatusDto
> {
  @Inject(TRANSACTION_STATUS_PROVIDER) repository: BaseRepo<TransactionStatus>;
}
