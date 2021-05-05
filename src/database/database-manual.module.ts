import { Global, Module } from '@nestjs/common';
import { DATABASE_MANUAL_PROVIDER } from './database.dto';
import { databaseManualProvider } from './database-manual.provider';
import { DatabaseManualService } from './database-manual.service';

@Global()
@Module({
  providers: [databaseManualProvider, DatabaseManualService],
  exports: [DATABASE_MANUAL_PROVIDER, DatabaseManualService],
})
export class DatabaseManualModule {}
