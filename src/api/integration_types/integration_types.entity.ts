import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../base/base.entity';
import { TenancyOauth2Credentials } from '../tenancy_oauth2_credentials/tenancy_oauth2_credentials.entity';
import { INTEGRATION_TYPES_ENTITY } from './integration_types.dto';

@Entity({ name: INTEGRATION_TYPES_ENTITY, schema: 'public' })
export class IntegrationTypes extends Base {
  @Column({ type: 'varchar' }) description: string;
  @Column({ type: 'varchar' }) type: string;
  @Column({ type: 'varchar' }) callback: string;
  @OneToMany(
    () => TenancyOauth2Credentials,
    (credential) => credential.integration_type,
  )
  credentials: TenancyOauth2Credentials[];
}
