import { Scope, Request, DynamicModule, Global, Module } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './../../api/acl/users/users.service';
import { TokenService } from '../services/token.service';
import { UsersModule } from './../../api/acl/users/users.module';
import { UsersRoles } from './../../api/acl/users_roles/users_roles.entity';

export const INFO_USER_PROVIDER = 'INFO_USER_PROVIDER';

export interface InfoUserProvider {
  id: number;
  email: string;
  name: string;
  roles: UsersRoles[];
}

@Global()
@Module({})
export class InfoUserModule {
  static forRoot(): DynamicModule {
    const infoTokenProvider = {
      provide: INFO_USER_PROVIDER,
      scope: Scope.REQUEST,
      inject: [REQUEST, TokenService, UsersService],
      useFactory: async (
        req: Request,
        tokenService: TokenService,
        usersService: UsersService,
      ) => {
        const token = req.headers['authorization'];
        const dataToken = await tokenService
          .verifyToken(token.split(' ')[1])
          .then((result: any) => result.data);
        const dataRoles = await usersService.findRoles(dataToken.id);
        const dataUser: InfoUserProvider = {
          ...dataToken,
          roles: dataRoles,
        };
        return dataUser;
      },
    };
    return {
      module: InfoUserModule,
      imports: [JwtModule.register({}), UsersModule],
      providers: [infoTokenProvider, TokenService],
      exports: [infoTokenProvider],
    };
  }
}
// @Inject(INFO_USER_PROVIDER) private infoUser: InfoUserProvider
