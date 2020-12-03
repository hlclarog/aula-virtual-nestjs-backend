import { Global, Module } from '@nestjs/common';
import { TENANCY_PROVIDER } from './database.dto';
import { tenancyProvider } from './tenancy.provider';

@Global()
@Module({
  providers: [tenancyProvider],
  exports: [TENANCY_PROVIDER],
})
export class TenancyModule {}
