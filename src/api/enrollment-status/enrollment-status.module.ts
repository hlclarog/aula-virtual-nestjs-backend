import { Module } from '@nestjs/common';
import { EnrollmentStatusService } from './enrollment-status.service';
import { EnrollmentStatusController } from './enrollment-status.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { ENROLLMENT_STATUS_PROVIDER } from './enrollment-status.dto';
import { EnrollmentStatus } from './enrollment-status.entity';

@Module({
  controllers: [EnrollmentStatusController],
  providers: [
    {
      provide: ENROLLMENT_STATUS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(EnrollmentStatus),
    },
    EnrollmentStatusService,
  ],
})
export class EnrollmentStatusModule {}
