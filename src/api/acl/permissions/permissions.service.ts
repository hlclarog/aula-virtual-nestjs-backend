import { Inject, Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import {
  CreatePermissionsDto,
  UpdatePermissionsDto,
  PERMISSIONS_PROVIDER,
} from './permissions.dto';
import { BaseService } from '../../../base/base.service';
import { BaseRepo } from '../../../base/base.repository';
import { Permissions } from './permissions.entity';
import { TENANCY_MODULES_PROVIDER } from './../../tenancy_modules/tenancy_modules.dto';
import { TenancyModules } from './../../tenancy_modules/tenancy_modules.entity';
import {
  INFO_TENANCY_PROVIDER,
  InfoTenancyDomain,
} from '../../../utils/providers/info-tenancy.module';

@Injectable()
export class PermissionsService extends BaseService<
  Permissions,
  CreatePermissionsDto,
  UpdatePermissionsDto
> {
  @Inject(PERMISSIONS_PROVIDER) repository: BaseRepo<Permissions>;
  @Inject(TENANCY_MODULES_PROVIDER)
  repositoryTenanciesModules: BaseRepo<TenancyModules>;
  @Inject(INFO_TENANCY_PROVIDER) tenancy: InfoTenancyDomain;

  constructor() {
    super();
  }

  async findForTenancy(): Promise<Permissions[]> {
    const modules = await this.repositoryTenanciesModules.find({
      where: {
        tenancy_id: this.tenancy.domain.tenancy_id,
      },
    });
    const modulesListIds = modules.map((module) => module.module_id);
    return await this.repository
      .createQueryBuilder('permission')
      .select([
        'permission.id',
        'permission.name',
        'permission.display_name',
        'permission.description',
        'permission.module_id',
        'permission.active',
        'module.id',
        'module.name',
        'module.translate',
      ])
      .leftJoin('permission.module', 'module')
      .where(
        `module.id in (${
          modulesListIds.length > 0 ? modulesListIds.join() : [0].join()
        })`,
        {},
      )
      .getMany();
  }
}
