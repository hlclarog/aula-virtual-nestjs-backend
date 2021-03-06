import { Inject, Injectable } from '@nestjs/common';
import {
  CreateTenancyOauth2CredentialsDto,
  UpdateTenancyOauth2CredentialsDto,
  TENANCY_DOMAINS_PROVIDER,
} from './tenancy_oauth2_credentials.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { TenancyOauth2Credentials } from './tenancy_oauth2_credentials.entity';

@Injectable()
export class TenancyOauth2CredentialsService extends BaseService<
  TenancyOauth2Credentials,
  CreateTenancyOauth2CredentialsDto,
  UpdateTenancyOauth2CredentialsDto
> {
  @Inject(TENANCY_DOMAINS_PROVIDER)
  repository: BaseRepo<TenancyOauth2Credentials>;
}
