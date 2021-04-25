import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { InstanceProcessModule } from '../../queues/instance_process/instance_process.module';
import { COURSE_PAYMENTS_PROVIDER } from './course_payments.dto';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { CoursePayments } from './course_payments.entity';
import { CoursePaymentService } from './course_payment.service';
import { CoursePaymentsController } from './course_payments.controller';
@Module({
  imports: [InstanceProcessModule],
  controllers: [CoursePaymentsController],
  providers: [
    {
      provide: COURSE_PAYMENTS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(CoursePayments),
    },
    CoursePaymentService,
  ],
  exports: [COURSE_PAYMENTS_PROVIDER, CoursePaymentService],
})
export class CoursePaymentsModule {}
