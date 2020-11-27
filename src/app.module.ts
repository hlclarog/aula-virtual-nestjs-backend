import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { join } from 'path';
import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';

const FOLDER_ENV = join(__dirname, '..', 'env');
const FILE_ENV = `${FOLDER_ENV}/${process.env.NODE_ENV || 'development'}.env`;

@Module({
  imports: [
    ConfigModule.forRoot(FILE_ENV),
    DatabaseModule.forRoot(),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }),
    },
  ],
})
export class AppModule {
  
}
