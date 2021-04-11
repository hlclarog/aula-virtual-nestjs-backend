import { forwardRef, Module } from '@nestjs/common';
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
import { LinkedinController } from './linkedin/linkedin.controller';
import { LinkedinStrategy } from './linkedin/linkedin.strategy';
import { FacebookController } from './facebook/facebook.controller';
import { FacebookStrategy } from './facebook/facebook.strategy';
import { CryptoService } from '../utils/services/crypto.service';
import { FacebookService } from './facebook/facebook.service';

@Module({
  imports: [
    UsersModule,
    TenancyConfigModule,
    JwtModule.register({}),
    InfoUserModule.forRoot(),
    forwardRef(() => PointsUserLogModule),
    PassportModule.register({ session: true }),
  ],
  controllers: [
    AuthController,
    GoogleController,
    LinkedinController,
    FacebookController,
  ],
  providers: [
    TokenService,
    AuthService,
    GoogleService,
    FacebookService,
    GoogleStrategy,
    LinkedinStrategy,
    CryptoService,
  ],
})
export class AuthModule {}
