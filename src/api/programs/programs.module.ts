import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { InstanceProcessModule } from '../../queues/instance_process/instance_process.module';
import { PROGRAMS_PROVIDER } from './programs.dto';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { Programs } from './programs.entity';
import { ProgramInterestAreasModule } from '../program_interest_areas/program_interest_areas.module';
import { AwsModule } from './../../aws/aws.module';

@Module({
  imports: [InstanceProcessModule, ProgramInterestAreasModule, AwsModule],
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
