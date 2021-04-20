import { Module } from '@nestjs/common';
import { CourseCommissionOrganizationsService } from './course_commission_organizations.service';
import { CourseCommissionOrganizationsController } from './course_commission_organizations.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { COURSE_COMMISSION_ORGANIZATIONS_PROVIDER } from './course_commission_organizations.dto';
import { CourseCommissionOrganizations } from './course_commission_organizations.entity';

@Module({
  controllers: [CourseCommissionOrganizationsController],
  providers: [
    {
      provide: COURSE_COMMISSION_ORGANIZATIONS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(CourseCommissionOrganizations),
    },
    CourseCommissionOrganizationsService,
  ],
  exports: [
    COURSE_COMMISSION_ORGANIZATIONS_PROVIDER,
    CourseCommissionOrganizationsService,
  ],
})
export class CourseCommissionOrganizationsModule {}
