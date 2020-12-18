import { Inject, Injectable } from '@nestjs/common';
import {
  CreateTenancyDomainsDto,
  UpdateTenancyDomainsDto,
  TENANCY_DOMAINS_PROVIDER,
} from './tenancy_domains.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { TenancyDomains } from './tenancy_domains.entity';

@Injectable()
export class TenancyDomainsService extends BaseService<
  TenancyDomains,
  CreateTenancyDomainsDto,
  UpdateTenancyDomainsDto
> {
  @Inject(TENANCY_DOMAINS_PROVIDER) repository: BaseRepo<TenancyDomains>;
}
