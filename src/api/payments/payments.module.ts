import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { InstanceProcessModule } from '../../queues/instance_process/instance_process.module';
import { PAYMENTS_PROVIDER } from './payments.dto';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { Payments } from './payments.entity';
import { ProgramPaymentModule } from '../program_payment/program_payment.module';
import { ProgramsModule } from '../programs/programs.module';
import { AwsModule } from '../../aws/aws.module';

@Module({
  imports: [
    InstanceProcessModule,
    ProgramPaymentModule,
    ProgramsModule,
    AwsModule,
  ],
  controllers: [PaymentsController],
  providers: [
    {
      provide: PAYMENTS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(Payments),
    },
    PaymentsService,
  ],
})
export class PaymentsModule {}
