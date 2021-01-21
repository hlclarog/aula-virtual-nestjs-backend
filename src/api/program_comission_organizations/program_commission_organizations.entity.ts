import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Base } from '../../base/base.entity';
import { PROGRAM_COMMISSION_ORGANIZATIONS_ENTITY } from './program_commission_organizations.dto';
import { Courses } from '../courses/courses.entity';
import { Organizations } from '../organizations/organizations.entity';
import { Programs } from '../programs/programs.entity';

@Entity({ name: PROGRAM_COMMISSION_ORGANIZATIONS_ENTITY })
export class ProgramCommissionOrganizations extends Base {
  @ManyToOne(
    () => Programs,
    (programs) => programs.program_commission_organizations,
  )
  @JoinColumn({ name: 'program_id' })
  program: Programs;
  @RelationId(
    (courseCommissionOrganizations: ProgramCommissionOrganizations) =>
      courseCommissionOrganizations.program,
  )
  program_id: number;

  @ManyToOne(
    () => Organizations,
    (organization) => organization.program_commission_organizations,
  )
  @JoinColumn({ name: 'organization_id' })
  organization: Organizations;
  @RelationId(
    (courseCommissionOrganizations: ProgramCommissionOrganizations) =>
      courseCommissionOrganizations.organization,
  )
  organization_id: number;

  @Column({ type: 'int' }) percentage: number;
}
