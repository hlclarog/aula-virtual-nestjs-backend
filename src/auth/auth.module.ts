import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { InfoUserModule } from './../utils/providers/info-user.module';
import { UsersModule } from './../api/acl/users/users.module';
import { TokenService } from './../utils/services/token.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TenancyConfigModule } from './../api/tenancy_config/tenancy_config.module';
import { PointsUserLogModule } from './../api/points_user_log/points_user_log.module';

@Module({
  imports: [
    UsersModule,
    TenancyConfigModule,
    JwtModule.register({}),
    InfoUserModule.forRoot(),
    PointsUserLogModule,
  ],
  controllers: [AuthController],
  providers: [TokenService, AuthService],
})
export class AuthModule {}
