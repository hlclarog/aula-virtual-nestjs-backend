import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { InfoUserModule } from '../utils/providers/info-user.module';
import { UsersModule } from '../api/acl/users/users.module';
import { TokenService } from '../utils/services/token.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TenancyConfigModule } from '../api/tenancy_config/tenancy_config.module';
import { PointsUserLogModule } from '../api/points_user_log/points_user_log.module';
import { GoogleController } from './google/google.controller';
import { GoogleService } from './google/google.service';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google/google.strategy';

@Module({
  imports: [
    UsersModule,
    TenancyConfigModule,
    JwtModule.register({}),
    InfoUserModule.forRoot(),
    PointsUserLogModule,
    PassportModule.register({ session: true }),
  ],
  controllers: [AuthController, GoogleController],
  providers: [TokenService, AuthService, GoogleService, GoogleStrategy],
})
export class AuthModule {}
