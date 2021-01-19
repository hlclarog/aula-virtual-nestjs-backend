import { Module } from '@nestjs/common';
import { EnrollmentTypesService } from './enrollment-types.service';
import { EnrollmentTypesController } from './enrollment-types.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { ENROLLMENT_TYPES_PROVIDER } from './enrollment-types.dto';
import { EnrollmentTypes } from './enrollment-types.entity';

@Module({
  controllers: [EnrollmentTypesController],
  providers: [
    {
      provide: ENROLLMENT_TYPES_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(EnrollmentTypes),
    },
    EnrollmentTypesService,
  ],
})
export class EnrollmentTypesModule {}
