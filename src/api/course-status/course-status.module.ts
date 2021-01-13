import { Module } from '@nestjs/common';
import { CourseStatusService } from './course-status.service';
import { CourseStatusController } from './course-status.controller';
import { InstanceProcessModule } from '../../queues/instance_process/instance_process.module';
import { COURSE_STATUS_PROVIDER } from './course-status.dto';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { CourseStatus } from './course-status.entity';

@Module({
  imports: [InstanceProcessModule],
  controllers: [CourseStatusController],
  providers: [
    {
      provide: COURSE_STATUS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(CourseStatus),
    },
    CourseStatusService,
  ],
})
export class CourseStatusModule {}
