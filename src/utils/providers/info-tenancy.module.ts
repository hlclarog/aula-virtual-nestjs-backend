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
import { TenancyOauth2CredentialsService,
} from '../../api/tenancy_oauth2_credentials/tenancy_oauth2_credentials.service';

export const INFO_TENANCY_PROVIDER = 'INFO_TENANCY_PROVIDER';
export interface ICredential {
  client_iD: string;
  client_secret: string;
  callback_url: string;
  scope: string;
}
export interface InfoTenancyDomain {
  id: number;
  domain: TenancyDomains;
  schema: string;
  host: string;
  secret: string;
  credentials: {
    google: ICredential;
    facebook: ICredential;
    linkedin: ICredential;
  };
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
        tenancyOauth2CredentialsService: TenancyOauth2CredentialsService,
      ) => {
        const host = getHostFromOrigin(req.headers);
        const domain = await tenancyDomainsService.findForDomain(host);
        const credentials = await tenancyOauth2CredentialsService.findCredentials();
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
        return {
          id: domain.tenancy_id,
          domain,
          host,
          schema,
          secret,
          credentials,
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

// @Inject(INFO_TENANCY_PROVIDER) private tenancy: InfoTenancyDomain;
