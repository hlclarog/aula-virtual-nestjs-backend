import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../../base/base.service';
import {
  CreateProgramCommissionOrganizationsDto,
  PROGRAM_COMMISSION_ORGANIZATIONS_PROVIDER,
  UpdateProgramCommissionOrganizationsDto,
} from './program_commission_organizations.dto';
import { ProgramCommissionOrganizations } from './program_commission_organizations.entity';
import { BaseRepo } from '../../base/base.repository';

@Injectable()
export class ProgramCommissionOrganizationsService extends BaseService<
  ProgramCommissionOrganizations,
  CreateProgramCommissionOrganizationsDto,
  UpdateProgramCommissionOrganizationsDto
> {
  @Inject(PROGRAM_COMMISSION_ORGANIZATIONS_PROVIDER)
  repository: BaseRepo<ProgramCommissionOrganizations>;

  async findByCourse(id: number): Promise<ProgramCommissionOrganizations[]> {
    return await this.repository.find({
      where: { program_id: id },
      relations: ['program', 'organization'],
    });
  }
}
