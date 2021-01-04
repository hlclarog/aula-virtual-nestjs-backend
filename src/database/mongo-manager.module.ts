import { DynamicModule, Global, Module } from '@nestjs/common';
import { mongoManagerProviders } from './mongo-manager.providers';

@Global()
@Module({})
export class MongoManagerModule {
  static forRoot(): DynamicModule {
    return {
      module: MongoManagerModule,
      providers: [...mongoManagerProviders],
      exports: [...mongoManagerProviders],
    };
  }
}
