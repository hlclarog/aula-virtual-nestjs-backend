import { Module } from '@nestjs/common';
import { CourseUsersService } from './course-users.service';
import { CourseUsersController } from './course-users.controller';
import { Connection } from 'typeorm';
import { COURSE_USERS_ENTITY, COURSE_USERS_PROVIDER } from './course-users.dto';
import { CourseUsers } from './course-users.entity';

@Module({
  controllers: [CourseUsersController],
  providers: [
    {
      provide: COURSE_USERS_PROVIDER,
      inject: [COURSE_USERS_ENTITY],
      useFactory: (connection: Connection) =>
        connection.getRepository(CourseUsers),
    },
    CourseUsersService,
  ],
})
export class CourseUsersModule {}
