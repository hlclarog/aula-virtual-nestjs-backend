import { Module } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { ProgramsController } from './programs.controller';
import { InstanceProcessModule } from '../../queues/instance_process/instance_process.module';
import { PROGRAMS_PROVIDER } from './programs.dto';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { Programs } from './programs.entity';
import { ProgramInterestAreasModule } from '../program_interest_areas/program_interest_areas.module';
import { AwsModule } from '../../aws/aws.module';
import { InterestAreasModule } from '../interest_areas/interest_areas.module';
import { ProgramFeeSchedulesService } from '../program_fee_schedules/program_fee_schedules.service';
import { ProgramFeeSchedulesModule } from '../program_fee_schedules/program_fee_schedules.module';
import { ProgramCoursesModule } from '../program_courses/program_courses.module';

@Module({
  imports: [
    InstanceProcessModule,
    ProgramInterestAreasModule,
    AwsModule,
    InterestAreasModule,
    ProgramFeeSchedulesModule,
    ProgramCoursesModule,
  ],
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
  exports: [PROGRAMS_PROVIDER, ProgramsService],
})
export class ProgramsModule {}
