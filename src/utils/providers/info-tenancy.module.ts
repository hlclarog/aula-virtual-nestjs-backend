import { Scope, DynamicModule, Global, Module } from '@nestjs/common';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { getHostFromOrigin } from '../helper';
import { TenancyDomainsModule } from '../../api/tenancy_domains/tenancy_domains.module';
import { TenancyDomainsService } from '../../api/tenancy_domains/tenancy_domains.service';
import { TenancyDomains } from '../../api/tenancy_domains/tenancy_domains.entity';
import { CryptoService } from '../services/crypto.service';
import { ConfigService } from '../../config/config.service';
import { ConfigModule } from '../../config/config.module';
import { TenancyOauth2Credentials } from '../../api/tenancy_oauth2_credentials/tenancy_oauth2_credentials.entity';

export const INFO_TENANCY_PROVIDER = 'INFO_TENANCY_PROVIDER';

export interface InfoTenancyDomain {
  id: number;
  domain: TenancyDomains;
  schema: string;
  host: string;
  secret: string;
  tenancyOauth2Credentials: TenancyOauth2Credentials[];
}

@Global()
@Module({})
export class InfoTenancyModule {
  static forRoot(): DynamicModule {
    const infoChannelProvider = {
      provide: INFO_TENANCY_PROVIDER,
      scope: Scope.REQUEST,
      inject: [REQUEST, ConfigService, TenancyDomainsService, CryptoService],
      useFactory: async (
        req: Request,
        configService: ConfigService,
        tenancyDomainsService: TenancyDomainsService,
        cryptoService: CryptoService,
      ) => {
        const host = getHostFromOrigin(req.headers);
        const domain = await tenancyDomainsService.findForDomain(host);
        const schema = domain
          ? domain.tenancy
            ? domain.tenancy.schema
            : ''
          : '';
        const payload = `${domain.tenancy.schema}.${host}`;
        const secret = await cryptoService.hashSecret(
          payload,
          configService.hashTokenSecret(),
        );
        const tenancyOauth2Credentials: TenancyOauth2Credentials[] = await tenancyDomainsService.findTenancyOauth2Credentials();
        return {
          id: domain.tenancy_id,
          domain,
          host,
          schema,
          secret,
          tenancyOauth2Credentials,
        };
      },
    };
    return {
      module: InfoTenancyModule,
      imports: [ConfigModule, TenancyDomainsModule],
      providers: [infoChannelProvider, CryptoService],
      exports: [infoChannelProvider],
    };
  }
}
