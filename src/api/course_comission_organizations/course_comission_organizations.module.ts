import { Module } from '@nestjs/common';
import { CourseComissionOrganizationsService } from './course_comission_organizations.service';
import { CourseComissionOrganizationsController } from './course_comission_organizations.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { PROGRAM_STATUS_PROVIDER } from './course_comission_organizations.dto';
import { CourseComissionOrganizations } from './course_comission_organizations.entity';

@Module({
  controllers: [CourseComissionOrganizationsController],
  providers: [
    {
      provide: PROGRAM_STATUS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(CourseComissionOrganizations),
    },
    CourseComissionOrganizationsService,
  ],
})
export class CourseComissionOrganizationsModule {}
