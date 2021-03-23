import { Inject, Injectable } from '@nestjs/common';
import {
  CreateTenancyDomainsDto,
  UpdateTenancyDomainsDto,
  TENANCY_DOMAINS_PROVIDER,
} from './tenancy_domains.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { TenancyDomains } from './tenancy_domains.entity';
import { TENANCY_OAUTH2_CREDENTIALS_PROVIDER } from '../tenancy_oauth2_credentials/tenancy_oauth2_credentials.dto';
import { TenancyOauth2Credentials } from '../tenancy_oauth2_credentials/tenancy_oauth2_credentials.entity';

@Injectable()
export class TenancyDomainsService extends BaseService<
  TenancyDomains,
  CreateTenancyDomainsDto,
  UpdateTenancyDomainsDto
> {
  @Inject(TENANCY_DOMAINS_PROVIDER) repository: BaseRepo<TenancyDomains>;
  @Inject(TENANCY_OAUTH2_CREDENTIALS_PROVIDER)
  tenancyOauth2Credentials: BaseRepo<TenancyOauth2Credentials>;

  async findForDomain(domain: string): Promise<TenancyDomains> {
    return this.repository.findOneOrFail({
      relations: ['tenancy'],
      where: { description: domain },
    });
  }

  async findTenancyOauth2Credentials(): Promise<TenancyOauth2Credentials[]> {
    return await this.tenancyOauth2Credentials.find({
      relations: ['integration_type'],
    });
  }
}
