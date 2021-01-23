import { Module } from '@nestjs/common';
import { CourseInterestAreasService } from './course_interest_areas.service';
import { CourseInterestAreasController } from './course_interest_areas.controller';
import { Connection } from 'typeorm';
import { COURSE_INTEREST_AREAS_PROVIDER } from './course_interest_areas.dto';
import { CourseInterestAreas } from './course_interest_areas.entity';
import { DATABASE_TENANCY_PROVIDER } from './../../database/database.dto';

@Module({
  controllers: [CourseInterestAreasController],
  providers: [
    {
      provide: COURSE_INTEREST_AREAS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(CourseInterestAreas),
    },
    CourseInterestAreasService,
  ],
  exports: [COURSE_INTEREST_AREAS_PROVIDER, CourseInterestAreasService],
})
export class CourseInterestAreasModule {}
