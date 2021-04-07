import { CourseLessonsController } from './course_lessons.controller';
import { Module } from '@nestjs/common';
import { COURSE_LESSONS_PROVIDER } from './course_lessons.dto';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { CourseLessons } from './course_lessons.entity';
import { CourseLessonsService } from './course_lessons.service';

@Module({
  controllers: [CourseLessonsController],
  providers: [
    {
      provide: COURSE_LESSONS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(CourseLessons),
    },
    CourseLessonsService,
  ],
  exports: [COURSE_LESSONS_PROVIDER, CourseLessonsService],
})
export class CourseLessonsModule {}
