import { Module } from '@nestjs/common';
import { CourseUsersService } from './course-users.service';
import { CourseUsersController } from './course-users.controller';
import { Connection } from 'typeorm';
import { COURSE_USERS_PROVIDER } from './course-users.dto';
import { CourseUsers } from './course-users.entity';
import { DATABASE_TENANCY_PROVIDER } from './../../database/database.dto';
import { LessonsModule } from '../lessons/lessons.module';
import { PointsUserLogModule } from './../points_user_log/points_user_log.module';
import { TenancyConfigModule } from '../tenancy_config/tenancy_config.module';
import { ActivityTryUsersModule } from '../activity_try_users/activity_try_users.module';
import { LessonScormIntentsModule } from '../lesson_scorm_intents/lesson_scorm_intents.module';
import { LessonTryUsersModule } from '../lesson_try_users/lesson_try_users.module';
import { ProgramUserCourseModule } from '../program_user_course/program_user_course.module';
import { ProgramCoursesModule } from '../program_courses/program_courses.module';
import { AwsModule } from './../../aws/aws.module';
import { EmailModule } from './../../email/email.module';

@Module({
  imports: [
    LessonsModule,
    PointsUserLogModule,
    TenancyConfigModule,
    ActivityTryUsersModule,
    LessonScormIntentsModule,
    LessonTryUsersModule,
    ProgramUserCourseModule,
    ProgramCoursesModule,
    AwsModule,
    EmailModule,
  ],
  controllers: [CourseUsersController],
  providers: [
    {
      provide: COURSE_USERS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(CourseUsers),
    },
    CourseUsersService,
  ],
  exports: [COURSE_USERS_PROVIDER, CourseUsersService],
})
export class CourseUsersModule {}
