import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { InfoUserModule } from './../utils/providers/info-user.module';
import { UsersModule } from './../api/acl/users/users.module';
import { TokenService } from './../utils/services/token.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UsersModule, JwtModule.register({}), InfoUserModule.forRoot()],
  controllers: [AuthController],
  providers: [TokenService, AuthService],
})
export class AuthModule {}
