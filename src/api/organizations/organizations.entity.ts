import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../base/base.entity';
import { ORGANIZATIONS_ENTITY } from './organizations.dto';
import { Programs } from '../programs/programs.entity';
import { Courses } from '../courses/courses.entity';
import { CourseCommissionOrganizations } from '../course_comission_organizations/course_commission_organizations.entity';
import { ProgramCommissionOrganizations } from '../program_comission_organizations/program_commission_organizations.entity';
import { Payments } from '../payments/payments.entity';
import { UsersOrganizations } from '../users_organizations/users_organizations.entity';
import { OrganizationsCertificates } from '../organizations_certificates/organizations_certificates.entity';

@Entity({ name: ORGANIZATIONS_ENTITY })
export class Organizations extends Base {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  short_name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  code: string;

  @Column({ type: 'varchar' })
  primary_color: string;

  @Column({ type: 'varchar' })
  secondary_color: string;

  @Column({ type: 'varchar' })
  tertiary_color: string;

  @OneToMany(() => Courses, (courses) => courses.organization)
  course: Courses[];

  @OneToMany(() => Programs, (program) => program.organization)
  programs: Programs[];

  @OneToMany(
    () => CourseCommissionOrganizations,
    (courseCommissionOrganizations) => courseCommissionOrganizations.course,
  )
  course_commission_organizations: CourseCommissionOrganizations[];

  @OneToMany(
    () => ProgramCommissionOrganizations,
    (programCommissionOrganizations) => programCommissionOrganizations.program,
  )
  program_commission_organizations: ProgramCommissionOrganizations[];

  @OneToMany(() => Payments, (payments) => payments.payment_state)
  payments: Payments[];

  @OneToMany(
    () => UsersOrganizations,
    (courseOrganization) => courseOrganization.organization,
  )
  users_organizations: UsersOrganizations[];

  @OneToMany(
    () => OrganizationsCertificates,
    (organizationsCertificates) => organizationsCertificates.organization,
  )
  organizations_certficates: OrganizationsCertificates[];
}
