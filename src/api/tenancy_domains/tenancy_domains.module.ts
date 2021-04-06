import { Module } from '@nestjs/common';
import { TenancyDomainsService } from './tenancy_domains.service';
import { TenancyDomainsController } from './tenancy_domains.controller';
import { DATABASE_MANAGER_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { TENANCY_DOMAINS_PROVIDER } from './tenancy_domains.dto';
import { TenancyDomains } from './tenancy_domains.entity';
import { TenancyOauth2CredentialsModule } from '../tenancy_oauth2_credentials/tenancy_oauth2_credentials.module';

@Module({
  controllers: [TenancyDomainsController],
  providers: [
    {
      provide: TENANCY_DOMAINS_PROVIDER,
      inject: [DATABASE_MANAGER_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(TenancyDomains),
    },
    TenancyDomainsService,
  ],
  exports: [TenancyDomainsService],
  imports: [TenancyOauth2CredentialsModule],
})
export class TenancyDomainsModule {}
