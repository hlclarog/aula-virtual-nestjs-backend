import { Module } from '@nestjs/common';
import { CourseTeachersService } from './course_teachers.service';
import { CourseTeachersController } from './course_teachers.controller';
import { Connection } from 'typeorm';
import { COURSE_TEACHERS_PROVIDER } from './course_teachers.dto';
import { CourseTeachers } from './course_teachers.entity';
import { DATABASE_TENANCY_PROVIDER } from './../../database/database.dto';

@Module({
  imports: [],
  controllers: [CourseTeachersController],
  providers: [
    {
      provide: COURSE_TEACHERS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(CourseTeachers),
    },
    CourseTeachersService,
  ],
  exports: [COURSE_TEACHERS_PROVIDER, CourseTeachersService],
})
export class CourseTeachersModule {}
