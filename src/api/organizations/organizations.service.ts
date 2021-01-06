import { Inject, Injectable } from '@nestjs/common';
import {
  CreateOrganizationsDto,
  UpdateOrganizationsDto,
  ORGANIZATIONS_PROVIDER,
} from './organizations.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { Organizations } from './organizations.entity';

@Injectable()
export class OrganizationsService extends BaseService<
  Organizations,
  CreateOrganizationsDto,
  UpdateOrganizationsDto
> {
  @Inject(ORGANIZATIONS_PROVIDER) repository: BaseRepo<Organizations>;

  constructor() {
    super();
  }
}
