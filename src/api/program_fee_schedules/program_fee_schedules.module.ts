import { Module } from '@nestjs/common';
import { ProgramFeeSchedulesService } from './program_fee_schedules.service';
import { ProgramFeeSchedulesController } from './program_fee_schedules.controller';
import { PROGRAM_FEE_SCHEDULE_PROVIDER } from './program_fee_schedules.dto';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { ProgramFeeSchedules } from './program_fee_schedules.entity';

@Module({
  controllers: [ProgramFeeSchedulesController],
  providers: [
    {
      provide: PROGRAM_FEE_SCHEDULE_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(ProgramFeeSchedules),
    },
    ProgramFeeSchedulesService,
  ],
})
export class ProgramFeeSchedulesModule {}
