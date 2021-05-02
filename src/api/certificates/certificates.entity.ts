import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { Base } from '../../base/base.entity';
import { CourseUsers } from '../course-users/course-users.entity';
import { OrganizationsCertificates } from '../organizations_certificates/organizations_certificates.entity';
import { ProgramUsers } from '../program_users/program_users.entity';
import { ORGANIZATIONS_ENTITY } from './certificates.dto';

@Entity({ name: ORGANIZATIONS_ENTITY })
export class Certificates extends Base {
  @ManyToOne(
    () => OrganizationsCertificates,
    (organizationsCertificates) => organizationsCertificates.certificates,
  )
  @JoinColumn({ name: 'organization_certificate_id' })
  organization_certificate: OrganizationsCertificates;
  @RelationId(
    (courseUsers: Certificates) => courseUsers.organization_certificate,
  )
  @Column({ type: 'integer' })
  organization_certificate_id: number;

  @Column({ type: 'varchar' }) reference_type: string;
  @Column({ type: 'integer' }) reference_id: number;
  @Column({ type: 'varchar' }) certification_validate_code: string;
  @Column({ type: 'varchar' }) link: string;

  @OneToMany(() => CourseUsers, (courseUsers) => courseUsers.certificate_id)
  courses_users: CourseUsers[];
  @OneToMany(() => ProgramUsers, (programUsers) => programUsers.certificate_id)
  programs_users: ProgramUsers[];
}
