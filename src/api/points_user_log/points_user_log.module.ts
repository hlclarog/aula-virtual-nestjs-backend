import { Module } from '@nestjs/common';
import { PointsUserLogService } from './points_user_log.service';
import { PointsUserLogController } from './points_user_log.controller';
import { Connection } from 'typeorm';
import { POINTS_USER_LOG_PROVIDER } from './points_user_log.dto';
import { PointsUserLog } from './points_user_log.entity';
import { DATABASE_TENANCY_PROVIDER } from './../../database/database.dto';
import { UsersModule } from '../acl/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [PointsUserLogController],
  providers: [
    {
      provide: POINTS_USER_LOG_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(PointsUserLog),
    },
    PointsUserLogService,
  ],
  exports: [POINTS_USER_LOG_PROVIDER, PointsUserLogService],
})
export class PointsUserLogModule {}
