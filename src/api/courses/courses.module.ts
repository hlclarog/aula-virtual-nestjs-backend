import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { InstanceProcessModule } from '../../queues/instance_process/instance_process.module';
import { COURSE_PROVIDER } from './courses.dto';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { Course } from './course.entity';

@Module({
  imports: [InstanceProcessModule],
  controllers: [CoursesController],
  providers: [
    {
      provide: COURSE_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) => connection.getRepository(Course),
    },
    CoursesService,
  ],
})
export class CoursesModule {}
