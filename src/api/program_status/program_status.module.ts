import { Module } from '@nestjs/common';
import { ProgramStatusService } from './program_status.service';
import { ProgramStatusController } from './program_status.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { PROGRAM_STATUS_PROVIDER } from './program_status.dto';
import { ProgramStatus } from './program_status.entity';

@Module({
  controllers: [ProgramStatusController],
  providers: [
    {
      provide: PROGRAM_STATUS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(ProgramStatus),
    },
    ProgramStatusService,
  ],
})
export class ProgramStatusModule {}
