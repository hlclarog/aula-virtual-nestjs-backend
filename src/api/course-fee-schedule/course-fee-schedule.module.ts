import { Module } from '@nestjs/common';
import { CourseFeeScheduleService } from './course-fee-schedule.service';
import { CourseFeeScheduleController } from './course-fee-schedule.controller';
import { InstanceProcessModule } from '../../queues/instance_process/instance_process.module';
import { COURSE_FEE_SCHEDULE_PROVIDER } from './course-fee-schedule.dto';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { CourseFeeSchedules } from './course-fee-schedule.entity';

@Module({
  imports: [InstanceProcessModule],
  controllers: [CourseFeeScheduleController],
  providers: [
    {
      provide: COURSE_FEE_SCHEDULE_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(CourseFeeSchedules),
    },
    CourseFeeScheduleService,
  ],
})
export class CourseFeeScheduleModule {}
