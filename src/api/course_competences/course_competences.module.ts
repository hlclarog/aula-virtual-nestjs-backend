import { CourseCompetencesController } from './course_competences.controller';
import { Module } from '@nestjs/common';
import { COURSE_COMPETENCES_PROVIDER } from './course_competences.dto';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { CourseCompetences } from './course_competences.entity';
import { CourseCompetencesService } from './course_competences.service';

@Module({
  controllers: [CourseCompetencesController],
  providers: [
    {
      provide: COURSE_COMPETENCES_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(CourseCompetences),
    },
    CourseCompetencesService,
  ],
  exports: [COURSE_COMPETENCES_PROVIDER, CourseCompetencesService],
})
export class CourseCompetencesModule {}
