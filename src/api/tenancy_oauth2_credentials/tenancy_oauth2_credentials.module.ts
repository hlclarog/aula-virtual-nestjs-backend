import { Module } from '@nestjs/common';
import { TenancyOauth2CredentialsService } from './tenancy_oauth2_credentials.service';
import { TenancyOauth2CredentialsController } from './tenancy_oauth2_credentials.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { TENANCY_DOMAINS_PROVIDER } from './tenancy_oauth2_credentials.dto';
import { TenancyOauth2Credentials } from './tenancy_oauth2_credentials.entity';

@Module({
  controllers: [TenancyOauth2CredentialsController],
  providers: [
    {
      provide: TENANCY_DOMAINS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(TenancyOauth2Credentials),
    },
    TenancyOauth2CredentialsService,
  ],
  exports: [TenancyOauth2CredentialsService],
})
export class TenancyOauth2CredentialsModule {}
