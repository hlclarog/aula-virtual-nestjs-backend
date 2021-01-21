import { Inject, Injectable } from '@nestjs/common';
import {
  CreateProgramComissionOrganizationsDto,
  UpdateProgramComissionOrganizationsDto,
  PROGRAM_STATUS_PROVIDER,
} from './program_comission_organizations.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { ProgramComissionOrganizations } from './program_comission_organizations.entity';

@Injectable()
export class ProgramComissionOrganizationsService extends BaseService<
  ProgramComissionOrganizations,
  CreateProgramComissionOrganizationsDto,
  UpdateProgramComissionOrganizationsDto
> {
  @Inject(PROGRAM_STATUS_PROVIDER) repository: BaseRepo<ProgramComissionOrganizations>;
}
