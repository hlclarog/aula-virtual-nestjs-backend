import { Module } from '@nestjs/common';
import { TransactionStatusService } from './transaction_status.service';
import { TransactionStatusController } from './transaction_status.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { TRANSACTION_STATUS_PROVIDER } from './transaction_status.dto';
import { TransactionStatus } from './transaction_status.entity';

@Module({
  controllers: [TransactionStatusController],
  providers: [
    {
      provide: TRANSACTION_STATUS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(TransactionStatus),
    },
    TransactionStatusService,
  ],
})
export class TransactionStatusModule {}
