import { Scope, DynamicModule, Global, Module } from '@nestjs/common';
import { UserLoader } from './user-loader.provider';
import { UserValidator } from './user-validator.provider';
import { Oauth2Module } from '@switchit/nestjs-oauth2-server';

export const OAUTH2_CONFIG = 'OAUTH2_CONFIG';

@Global()
@Module({})
export class Auth2ConfigModule {
  static forRoot(): DynamicModule {
    const infoChannelProvider = {
      provide: OAUTH2_CONFIG,
      scope: Scope.REQUEST,
      inject: [],
      useFactory: async () => {
        return {
          userLoader: new UserLoader(),
          userValidator: new UserValidator(),
        };
      },
    };
    return {
      module: Auth2ConfigModule,
      imports: [Oauth2Module.forRootAsync(infoChannelProvider)],
      providers: [],
      exports: [],
    };
  }
}

// @Inject(OAUTH2_CONFIG) private channel: Channels;
