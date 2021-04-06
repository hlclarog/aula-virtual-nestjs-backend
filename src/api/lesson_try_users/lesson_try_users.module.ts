import { Module } from '@nestjs/common';
import { LessonTryUsersService } from './lesson_try_users.service';
import { LessonTryUsersController } from './lesson_try_users.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { LESSON_TRY_USERS_PROVIDER } from './lesson_try_users.dto';
import { LessonTryUsers } from './lesson_try_users.entity';
import { PointsUserLogModule } from '../points_user_log/points_user_log.module';

@Module({
  imports: [PointsUserLogModule],
  controllers: [LessonTryUsersController],
  providers: [
    {
      provide: LESSON_TRY_USERS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(LessonTryUsers),
    },
    LessonTryUsersService,
  ],
  exports: [LESSON_TRY_USERS_PROVIDER, LessonTryUsersService],
})
export class LessonTryUsersModule {}
