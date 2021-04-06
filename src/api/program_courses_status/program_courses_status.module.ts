import { Module } from '@nestjs/common';
import { ProgramCoursesStatusService } from './program_courses_status.service';
import { ProgramCoursesStatusController } from './program_courses_status.controller';
import { DATABASE_MANAGER_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { PROGRAM_COURSES_STATUS_REPOSITORY } from './program_courses_status.dto';
import { ProgramCoursesStatus } from './program_courses_status.entity';

@Module({
  controllers: [ProgramCoursesStatusController],
  providers: [
    {
      provide: PROGRAM_COURSES_STATUS_REPOSITORY,
      inject: [DATABASE_MANAGER_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(ProgramCoursesStatus),
    },
    ProgramCoursesStatusService,
  ],
})
export class ProgramCoursesStatusModule {}
