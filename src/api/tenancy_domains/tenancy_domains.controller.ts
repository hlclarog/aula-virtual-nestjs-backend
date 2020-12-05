import { Controller } from '@nestjs/common';
import { TenancyDomainsService } from './tenancy_domains.service';
import {
  CreateTenancyDomainsDto,
  UpdateTenancyDomainsDto,
} from './tenancy_domains.dto';
import { BaseController } from '../../base/base.controller';
import { TenancyDomains } from './tenancy_domains.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tenancy_domains')
@Controller('/api/tenancy_domains')
export class TenancyDomainsController extends BaseController<
  TenancyDomains,
  CreateTenancyDomainsDto,
  UpdateTenancyDomainsDto
> {
  constructor(tenancy_domainsService: TenancyDomainsService) {
    super(tenancy_domainsService);
  }
}
