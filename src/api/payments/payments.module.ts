import { HttpModule, Module } from '@nestjs/common';
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
import { ProgramUsersModule } from '../program_users/program_users.module';
import { ProgramFeeSchedulesModule } from '../program_fee_schedules/program_fee_schedules.module';
import { CryptoService } from '../../utils/services/crypto.service';
import { CourseFeeScheduleService } from '../course-fee-schedule/course-fee-schedule.service';
import { CourseFeeScheduleModule } from '../course-fee-schedule/course-fee-schedule.module';

@Module({
  imports: [
    InstanceProcessModule,
    ProgramPaymentModule,
    ProgramsModule,
    AwsModule,
    ProgramUsersModule,
    ProgramFeeSchedulesModule,
    HttpModule,
    CourseFeeScheduleModule,
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
    CryptoService,
  ],
})
export class PaymentsModule {}
