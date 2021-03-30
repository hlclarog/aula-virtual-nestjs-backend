import { LessonsController } from './lessons.controller';
import { forwardRef, Module } from '@nestjs/common';
import { COURSE_UNITS_PROVIDER } from './lessons.dto';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { Lessons } from './lessons.entity';
import { LessonsService } from './lessons.service';
import { AwsModule } from './../../aws/aws.module';
import { LessonTryUsersModule } from '../lesson_try_users/lesson_try_users.module';
import { CoursesModule } from '../courses/courses.module';
import { AuthorizationsUserService } from './../../utils/services/authorizations-user.service';
import { UsersRolesModule } from '../acl/users_roles/users_roles.module';
import { LessonDetailsModule } from '../lesson_details/lesson_details.module';
import { LessonActivitiesModule } from '../lesson_activities/lesson_activities.module';
import { LessonScormsModule } from '../lesson_scorms/lesson_scorms.module';
import { LessonScormResourcesModule } from '../lesson_scorm_resources/lesson_scorm_resources.module';

@Module({
  imports: [
    forwardRef(() => CoursesModule),
    LessonTryUsersModule,
    LessonDetailsModule,
    LessonActivitiesModule,
    AwsModule,
    UsersRolesModule,
    LessonScormsModule,
    LessonScormResourcesModule,
  ],
  controllers: [LessonsController],
  providers: [
    {
      provide: COURSE_UNITS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) => connection.getRepository(Lessons),
    },
    LessonsService,
    AuthorizationsUserService,
  ],
  exports: [COURSE_UNITS_PROVIDER, LessonsService],
})
export class LessonsModule {}
