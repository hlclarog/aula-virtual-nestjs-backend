import { Module } from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CertificatesController } from './certificates.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { ORGANIZATIONS_PROVIDER } from './certificates.dto';
import { Certificates } from './certificates.entity';
import { OrganizationsCertificatesModule } from '../organizations_certificates/organizations_certificates.module';
import { LessonsModule } from '../lessons/lessons.module';
import { ProgramsModule } from '../programs/programs.module';
import { ProgramCoursesModule } from '../program_courses/program_courses.module';
import { AwsModule } from './../../aws/aws.module';
import { UsersModule } from '../acl/users/users.module';
import { CoursesModule } from '../courses/courses.module';
import { ProgramUsersModule } from '../program_users/program_users.module';
import { CourseUsersModule } from '../course-users/course-users.module';

@Module({
  imports: [
    AwsModule,
    OrganizationsCertificatesModule,
    LessonsModule,
    CoursesModule,
    CourseUsersModule,
    ProgramsModule,
    ProgramCoursesModule,
    ProgramUsersModule,
    UsersModule,
  ],
  controllers: [CertificatesController],
  providers: [
    {
      provide: ORGANIZATIONS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(Certificates),
    },
    CertificatesService,
  ],
})
export class CertificatesModule {}
