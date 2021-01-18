import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { InstanceProcessModule } from '../../queues/instance_process/instance_process.module';
import { PROGRAMS_PROVIDER } from './programs.dto';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { Programs } from './program.entity';

@Module({
  imports: [InstanceProcessModule],
  controllers: [ProgramsController],
  providers: [
    {
      provide: PROGRAMS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(Programs),
    },
    ProgramsService,
  ],
})
export class ProgramsModule {}
