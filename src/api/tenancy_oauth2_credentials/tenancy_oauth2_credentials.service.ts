import { Inject, Injectable } from '@nestjs/common';
import {
  CreateTenancyOauth2CredentialsDto,
  TENANCY_OAUTH2_CREDENTIALS_PROVIDER,
  UpdateTenancyOauth2CredentialsDto,
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
  @Inject(TENANCY_OAUTH2_CREDENTIALS_PROVIDER)
  repository: BaseRepo<TenancyOauth2Credentials>;

  async findByTenancy(id: number): Promise<TenancyOauth2Credentials[]> {
    return await this.repository
      .createQueryBuilder('credentials')
      .select([
        'credentials.id',
        'credentials.description',
        'credentials.type',
        'credentials.client_id',
        'credentials.client_secret',
        'credentials.scope',
        'credentials.private_key',
        'credentials.public_key',
        'credentials.tenancy_id',
      ])
      .where('credentials.tenancy_id: id', { id })
      .getMany();
  }
}
