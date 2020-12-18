import { Global, Module } from '@nestjs/common';
import { DATABASE_TENANCY_PROVIDER } from './database.dto';
import { databaseTenancyProvider } from './database-tenancy.provider';

@Global()
@Module({
  providers: [databaseTenancyProvider],
  exports: [DATABASE_TENANCY_PROVIDER],
})
export class DatabaseTenancyModule {}
