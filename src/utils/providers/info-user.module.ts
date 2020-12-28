import { Scope, Request, DynamicModule, Global, Module } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from '../services/token.service';
import { UsersRoles } from './../../api/acl/users_roles/users_roles.entity';
import { DATABASE_TENANCY_PROVIDER } from './../../database/database.dto';
import { Connection } from 'typeorm';

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
      inject: [REQUEST, TokenService, DATABASE_TENANCY_PROVIDER],
      useFactory: async (
        req: Request,
        tokenService: TokenService,
        connection: Connection,
      ) => {
        const token = req.headers['authorization'];
        const dataToken = await tokenService
          .verifyToken(token.split(' ')[1])
          .then((result: any) => result.data);
        const dataRoles = await connection.getRepository(UsersRoles).find({
          where: { user: dataToken.id },
          relations: ['rol', 'rol.roles_permissions'],
        });
        const dataUser: InfoUserProvider = {
          ...dataToken,
          roles: dataRoles,
        };
        return dataUser;
      },
    };
    return {
      module: InfoUserModule,
      imports: [JwtModule.register({})],
      providers: [infoTokenProvider, TokenService],
      exports: [infoTokenProvider],
    };
  }
}

// @Inject(INFO_USER_PROVIDER) private infoUser: InfoUserProvider
