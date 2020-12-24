import {
  MiddlewareConsumer,
  Module,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { join } from 'path';
import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from './config/config.module';
import { DatabaseManagerModule } from './database/database-manager.module';
import { DatabaseTenancyModule } from './database/database-tenancy.module';
import { MigrationsModule } from './migrations/migrations.module';
import { QueuesModule } from './queues/queues.module';
import { AuthVerifyTokenMiddleware } from './utils/middlewares/auth.middleware';
import { TokenService } from './utils/services/token.service';

const FOLDER_ENV = join(__dirname, '..', 'env');
const FILE_ENV = `${FOLDER_ENV}/${process.env.NODE_ENV || 'development'}.env`;

@Module({
  imports: [
    ConfigModule.forRoot(FILE_ENV),
    DatabaseManagerModule.forRoot(),
    DatabaseTenancyModule,
    ApiModule,
    AuthModule,
    MigrationsModule,
    JwtModule.register({}),
    QueuesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
    TokenService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthVerifyTokenMiddleware)
      .forRoutes({ path: 'api/(*)', method: RequestMethod.ALL });
  }
}
