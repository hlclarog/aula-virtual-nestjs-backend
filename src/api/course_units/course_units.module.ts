import { CourseUnitsController } from './course_units.controller';
import { Module } from '@nestjs/common';
import { COURSE_UNITS_PROVIDER } from './course_units.dto';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { CourseUnits } from './course_units.entity';
import { CourseUnitsService } from './course_units.service';

@Module({
  controllers: [CourseUnitsController],
  providers: [
    {
      provide: COURSE_UNITS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(CourseUnits),
    },
    CourseUnitsService,
  ],
  exports: [COURSE_UNITS_PROVIDER, CourseUnitsService],
})
export class CourseUnitsModule {}
