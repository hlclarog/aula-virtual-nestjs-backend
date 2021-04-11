import { forwardRef, Module } from '@nestjs/common';
import { PointsUserLogService } from './points_user_log.service';
import { PointsUserLogController } from './points_user_log.controller';
import { Connection } from 'typeorm';
import { POINTS_USER_LOG_PROVIDER } from './points_user_log.dto';
import { PointsUserLog } from './points_user_log.entity';
import { DATABASE_TENANCY_PROVIDER } from './../../database/database.dto';
import { UsersModule } from '../acl/users/users.module';
import { PointReasonsValueModule } from '../point_reasons_value/point_reasons_value.module';
import { WebsocketModule } from './../../websocket/websocket.module';
import { UsersRolesModule } from '../acl/users_roles/users_roles.module';
import { AuthorizationsUserService } from './../../utils/services/authorizations-user.service';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => WebsocketModule),
    PointReasonsValueModule,
    UsersRolesModule,
  ],
  controllers: [PointsUserLogController],
  providers: [
    {
      provide: POINTS_USER_LOG_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(PointsUserLog),
    },
    PointsUserLogService,
    AuthorizationsUserService,
  ],
  exports: [POINTS_USER_LOG_PROVIDER, PointsUserLogService],
})
export class PointsUserLogModule {}
