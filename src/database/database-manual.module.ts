import { Global, Module } from '@nestjs/common';
import { DATABASE_MANUAL_PROVIDER } from './database.dto';
import { databaseManualProvider } from './database-manual.provider';

@Global()
@Module({
  providers: [databaseManualProvider],
  exports: [DATABASE_MANUAL_PROVIDER],
})
export class DatabaseManualModule {}
