import { Module, Global, DynamicModule } from '@nestjs/common';
import { databaseManagerProviders } from './database-manager.providers';

@Global()
@Module({})
export class DatabaseManagerModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseManagerModule,
      providers: [...databaseManagerProviders],
      exports: [...databaseManagerProviders],
    };
  }
}
