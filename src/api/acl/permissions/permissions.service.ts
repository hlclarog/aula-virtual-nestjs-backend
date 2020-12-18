import { Inject, Injectable } from '@nestjs/common';
import {
  CreatePermissionsDto,
  UpdatePermissionsDto,
  PERMISSIONS_PROVIDER,
} from './permissions.dto';
import { BaseService } from '../../../base/base.service';
import { BaseRepo } from '../../../base/base.repository';
import { Permissions } from './permissions.entity';

@Injectable()
export class PermissionsService extends BaseService<
  Permissions,
  CreatePermissionsDto,
  UpdatePermissionsDto
> {
  @Inject(PERMISSIONS_PROVIDER) repository: BaseRepo<Permissions>;

  constructor() {
    super();
  }
}
