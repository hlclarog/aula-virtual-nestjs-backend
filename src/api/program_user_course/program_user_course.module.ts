import { Module } from '@nestjs/common';
import { ProgramUserCourseService } from './program_user_course.service';
import { ProgramUserCourseController } from './program_user_course.controller';
import { InstanceProcessModule } from '../../queues/instance_process/instance_process.module';
import { PROGRAM_USER_COURSE_PROVIDER } from './program_user_course.dto';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { ProgramUserCourse } from './program_user_course.entity';

@Module({
  imports: [InstanceProcessModule],
  controllers: [ProgramUserCourseController],
  providers: [
    {
      provide: PROGRAM_USER_COURSE_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(ProgramUserCourse),
    },
    ProgramUserCourseService,
  ],
})
export class ProgramUserCourseModule {}
