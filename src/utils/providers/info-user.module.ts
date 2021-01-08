import { Scope, DynamicModule, Global, Module } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from '../services/token.service';
import { UsersRoles } from './../../api/acl/users_roles/users_roles.entity';
import { DATABASE_TENANCY_PROVIDER } from './../../database/database.dto';
import { Connection } from 'typeorm';
import { CryptoService } from '../services/crypto.service';
import { getHostFromOrigin } from '../helper';
import { Request } from 'express';
import { TenancyDomains } from './../../api/tenancy_domains/tenancy_domains.entity';
import { ConfigService } from './../../config/config.service';
import { ConfigModule } from './../../config/config.module';
import { join } from 'path';

const FOLDER_ENV = join(__dirname, '..', '..', '..', 'env');
const FILE_ENV = `${FOLDER_ENV}/${process.env.NODE_ENV || 'development'}.env`;

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
      inject: [
        REQUEST,
        TokenService,
        DATABASE_TENANCY_PROVIDER,
        CryptoService,
        ConfigService,
      ],
      useFactory: async (
        req: Request,
        tokenService: TokenService,
        connection: Connection,
        cryptoService: CryptoService,
        configService: ConfigService,
      ) => {
        const token = req.headers.authorization;
        const host = getHostFromOrigin(req.headers.origin);
        const dataTenant: TenancyDomains = await connection
          .getRepository(TenancyDomains)
          .findOneOrFail({
            relations: ['tenancy'],
            where: { description: host },
          });
        const payload = `${dataTenant.tenancy.schema}.${host}`;
        const secret = await cryptoService.hashSecret(
          payload,
          configService.hashTokenSecret(),
        );
        const dataToken = token
          ? await tokenService
              .verifyTokenKey(token.split(' ')[1], secret)
              .then((result: any) => result.data)
          : null;
        const dataRoles = dataToken
          ? await connection.getRepository(UsersRoles).find({
              where: { user: dataToken.id },
              relations: ['rol', 'rol.roles_permissions'],
            })
          : [];
        const dataUser: InfoUserProvider = {
          ...dataToken,
          roles: dataRoles,
        };
        return dataUser;
      },
    };
    return {
      module: InfoUserModule,
      imports: [ConfigModule.forRoot(FILE_ENV), JwtModule.register({})],
      providers: [infoTokenProvider, TokenService, CryptoService],
      exports: [infoTokenProvider],
    };
  }
}

// @Inject(INFO_USER_PROVIDER) private infoUser: InfoUserProvider
