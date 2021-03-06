import { DynamicModule, Global, Module } from '@nestjs/common';
import { UserLoader } from './user-loader.provider';
import { UserValidator } from './user-validator.provider';
import { Oauth2Module } from 'nestjs-oauth2-server';
import { DATABASE_TENANCY_PROVIDER } from './../database/database.dto';

export const OAUTH2_CONFIG = 'OAUTH2_CONFIG';

@Module({})
export class Auth2ConfigModule {
  static forRoot(): DynamicModule {
    return {
      module: Auth2ConfigModule,
      imports: [
        Oauth2Module.forRoot({
          userLoader: new UserLoader(),
          userValidator: new UserValidator(),
          connection: DATABASE_TENANCY_PROVIDER,
        }),
      ],
      providers: [],
      exports: [],
    };
  }
}
