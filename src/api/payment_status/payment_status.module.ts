import { Module } from '@nestjs/common';
import { PaymentStatusService } from './payment_status.service';
import { PaymentStatusController } from './payment_status.controller';
import { InstanceProcessModule } from '../../queues/instance_process/instance_process.module';
import { PAYMENT_STATUS_PROVIDER } from './payment_status.dto';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { PaymentStatus } from './payment_status.entity';

@Module({
  imports: [InstanceProcessModule],
  controllers: [PaymentStatusController],
  providers: [
    {
      provide: PAYMENT_STATUS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(PaymentStatus),
    },
    PaymentStatusService,
  ],
})
export class PaymentStatusModule {}
