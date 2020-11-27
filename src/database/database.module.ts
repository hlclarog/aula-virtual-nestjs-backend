import { Module, Global, DynamicModule } from '@nestjs/common';
import { databaseProviders } from './database.providers';

@Global()
@Module({
})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return ({
      module: DatabaseModule,
      providers: [...databaseProviders],
      exports: [...databaseProviders],
    });
  }
};