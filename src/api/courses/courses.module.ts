import { forwardRef, Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { InstanceProcessModule } from '../../queues/instance_process/instance_process.module';
import { COURSES_PROVIDER } from './courses.dto';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { Courses } from './courses.entity';
import { CourseInterestAreasModule } from '../course_interest_areas/course_interest_areas.module';
import { AwsModule } from './../../aws/aws.module';
import { AuthorizationsUserService } from './../../utils/services/authorizations-user.service';
import { CourseUsersModule } from '../course-users/course-users.module';
import { InterestAreasModule } from '../interest_areas/interest_areas.module';
import { LessonsModule } from '../lessons/lessons.module';
import { UsersRolesModule } from '../acl/users_roles/users_roles.module';

@Module({
  imports: [
    InstanceProcessModule,
    CourseUsersModule,
    CourseInterestAreasModule,
    InterestAreasModule,
    forwardRef(() => LessonsModule),
    AwsModule,
    UsersRolesModule,
  ],
  controllers: [CoursesController],
  providers: [
    {
      provide: COURSES_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) => connection.getRepository(Courses),
    },
    CoursesService,
    AuthorizationsUserService,
  ],
  exports: [COURSES_PROVIDER, CoursesService],
})
export class CoursesModule {}
