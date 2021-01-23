import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { InstanceProcessModule } from '../../queues/instance_process/instance_process.module';
import { COURSES_PROVIDER } from './courses.dto';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { Courses } from './courses.entity';
import { CourseInterestAreasModule } from '../course_interest_areas/course_interest_areas.module';

@Module({
  imports: [InstanceProcessModule, CourseInterestAreasModule],
  controllers: [CoursesController],
  providers: [
    {
      provide: COURSES_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) => connection.getRepository(Courses),
    },
    CoursesService,
  ],
})
export class CoursesModule {}
