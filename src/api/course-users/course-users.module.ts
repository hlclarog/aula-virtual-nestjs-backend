import { Module } from '@nestjs/common';
import { CourseUsersService } from './course-users.service';
import { CourseUsersController } from './course-users.controller';
import { Connection } from 'typeorm';
import { COURSE_USERS_PROVIDER } from './course-users.dto';
import { CourseUsers } from './course-users.entity';
import { DATABASE_TENANCY_PROVIDER } from './../../database/database.dto';
import { LessonsModule } from '../lessons/lessons.module';
import { PointsUserLogModule } from './../points_user_log/points_user_log.module';

@Module({
  imports: [LessonsModule, PointsUserLogModule],
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
