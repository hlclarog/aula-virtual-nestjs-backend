import { Inject, Injectable } from '@nestjs/common';
import {
  CreateTenancyStatusDto,
  UpdateTenancyStatusDto,
  TENANCY_STATUS_PROVIDER,
} from './tenancy_status.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base-repo';
import { TenancyStatus } from './tenancy_status.entity';

@Injectable()
export class TenancyStatusService extends BaseService<
  TenancyStatus,
  CreateTenancyStatusDto,
  UpdateTenancyStatusDto
> {
  @Inject(TENANCY_STATUS_PROVIDER) repository: BaseRepo<TenancyStatus>;
}
