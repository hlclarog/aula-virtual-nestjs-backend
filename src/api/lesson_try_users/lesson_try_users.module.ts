import { Module } from '@nestjs/common';
import { LessonTryUsersService } from './lesson_try_users.service';
import { LessonTryUsersController } from './lesson_try_users.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { ACTIVITY_TRY_USERS_PROVIDER } from './lesson_try_users.dto';
import { LessonTryUsers } from './lesson_try_users.entity';

@Module({
  controllers: [LessonTryUsersController],
  providers: [
    {
      provide: ACTIVITY_TRY_USERS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(LessonTryUsers),
    },
    LessonTryUsersService,
  ],
  exports: [ACTIVITY_TRY_USERS_PROVIDER, LessonTryUsersService],
})
export class LessonTryUsersModule {}
