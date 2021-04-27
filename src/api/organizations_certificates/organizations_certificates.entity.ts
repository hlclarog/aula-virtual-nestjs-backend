import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { Base } from '../../base/base.entity';
import { Certificates } from '../certificates/certificates.entity';
import { Organizations } from '../organizations/organizations.entity';
import { ORGANIZATIONS_CERTIFICATES_ENTITY } from './organizations_certificates.dto';

@Entity({ name: ORGANIZATIONS_CERTIFICATES_ENTITY, schema: 'public' })
export class OrganizationsCertificates extends Base {
  @ManyToOne(
    () => Organizations,
    (organization) => organization.organizations_certficates,
  )
  @JoinColumn({ name: 'organization_id' })
  organization: Organizations;
  @RelationId((lessons: OrganizationsCertificates) => lessons.organization)
  @Column('integer')
  organization_id: number;

  @Column({ type: 'varchar' }) background: string;
  @Column({ type: 'varchar' }) background_demo: string;
  @Column({ type: 'varchar' }) content: string;
  @Column({ type: 'varchar' }) sign_text: string;
  @Column({ type: 'varchar' }) sign_picture: string;
  @Column({ type: 'varchar' }) sign_position: string;
  @Column({ type: 'boolean' }) selected: boolean;

  @OneToMany(
    () => Certificates,
    (certificates) => certificates.organization_certificate_id,
  )
  certificates: Certificates[];
}
