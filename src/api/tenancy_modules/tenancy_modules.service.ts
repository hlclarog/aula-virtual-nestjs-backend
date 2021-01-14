import { Inject, Injectable } from '@nestjs/common';
import {
  CreateTenancyModulesDto,
  UpdateTenancyModulesDto,
  TENANCY_MODULES_PROVIDER,
} from './tenancy_modules.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { TenancyModules } from './tenancy_modules.entity';

@Injectable()
export class TenancyModulesService extends BaseService<
  TenancyModules,
  CreateTenancyModulesDto,
  UpdateTenancyModulesDto
> {
  @Inject(TENANCY_MODULES_PROVIDER) repository: BaseRepo<TenancyModules>;
}
