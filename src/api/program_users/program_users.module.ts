import { Module } from '@nestjs/common';
import { ProgramUsersService } from './program_users.service';
import { ProgramUsersController } from './program_users.controller';
import { Connection } from 'typeorm';
import { PROGRAM_USERS_PROVIDER } from './program_users.dto';
import { ProgramUsers } from './program_users.entity';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { ProgramsModule } from '../programs/programs.module';
import { CourseUsersModule } from '../course-users/course-users.module';
import { ProgramUserCourseModule } from '../program_user_course/program_user_course.module';

@Module({
  imports: [ProgramsModule, CourseUsersModule, ProgramUserCourseModule],
  controllers: [ProgramUsersController],
  providers: [
    {
      provide: PROGRAM_USERS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(ProgramUsers),
    },
    ProgramUsersService,
  ],
  exports: [PROGRAM_USERS_PROVIDER, ProgramUsersService],
})
export class ProgramUsersModule {}
