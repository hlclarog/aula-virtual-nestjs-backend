import { Module } from '@nestjs/common';
import { ProgramPaymentService } from './program_payment.service';
import { ProgramPaymentController } from './program_payment.controller';
import { InstanceProcessModule } from '../../queues/instance_process/instance_process.module';
import { PROGRAM_PAYMENT_PROVIDER } from './program_payment.dto';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { ProgramPayment } from './program_payment.entity';

@Module({
  imports: [InstanceProcessModule],
  controllers: [ProgramPaymentController],
  providers: [
    {
      provide: PROGRAM_PAYMENT_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(ProgramPayment),
    },
    ProgramPaymentService,
  ],
  exports: [PROGRAM_PAYMENT_PROVIDER, ProgramPaymentService],
})
export class ProgramPaymentModule {}
