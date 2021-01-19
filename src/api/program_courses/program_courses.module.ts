import { Module } from '@nestjs/common';
import { ProgramCoursesService } from './program_courses.service';
import { ProgramCoursesController } from './program_courses.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { PROGRAM_COURSES_PROVIDER } from './program_courses.dto';
import { ProgramCourses } from './program_courses.entity';

@Module({
  controllers: [ProgramCoursesController],
  providers: [
    {
      provide: PROGRAM_COURSES_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(ProgramCourses),
    },
    ProgramCoursesService,
  ],
})
export class ProgramCoursesModule {}
