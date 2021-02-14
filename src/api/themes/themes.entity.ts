import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../base/base.entity';
import { Users } from '../acl/users/users.entity';
import { TenancyConfig } from '../tenancy_config/tenancy_config.entity';
import { THEMES_ENTITY } from './themes.dto';

@Entity({ name: THEMES_ENTITY, schema: 'public' })
export class Themes extends Base {
  @Column({ type: 'varchar' })
  code: string;
  @Column({ type: 'varchar' })
  description: string;
  @Column({ type: 'varchar' })
  observation: string;
  @Column({ type: 'varchar' })
  picture: string;

  @OneToMany(() => Users, (user) => user.theme)
  users: Users[];

  @OneToMany(() => TenancyConfig, (tenancy) => tenancy.theme)
  tenancies_config: TenancyConfig[];
}
