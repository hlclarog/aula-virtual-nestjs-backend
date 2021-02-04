import { Module } from '@nestjs/common';
import { ActivityTryUsersService } from './activity_try_users.service';
import { ActivityTryUsersController } from './activity_try_users.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { ACTIVITY_TRY_USERS_PROVIDER } from './activity_try_users.dto';
import { ActivityTryUsers } from './activity_try_users.entity';

@Module({
  controllers: [ActivityTryUsersController],
  providers: [
    {
      provide: ACTIVITY_TRY_USERS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(ActivityTryUsers),
    },
    ActivityTryUsersService,
  ],
  exports: [ACTIVITY_TRY_USERS_PROVIDER, ActivityTryUsersService],
})
export class ActivityTryUsersModule {}
