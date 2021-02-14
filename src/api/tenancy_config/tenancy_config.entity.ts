import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Base } from '../../base/base.entity';
import { Tenancies } from '../tenancies/tenancies.entity';
import { Themes } from '../themes/themes.entity';
import { TENANCY_CONFIG_ENTITY } from './tenancy_config.dto';

@Entity({ name: TENANCY_CONFIG_ENTITY })
export class TenancyConfig extends Base {
  @ManyToOne(() => Tenancies, (tenancy) => tenancy.config)
  @JoinColumn({ name: 'tenancy_id' })
  tenancy: TenancyConfig | number;
  @RelationId((tenancy_config: TenancyConfig) => tenancy_config.tenancy)
  tenancy_id: number;

  @ManyToOne(() => Themes, (theme) => theme.tenancies_config)
  @JoinColumn({ name: 'theme_id' })
  theme: Themes | number;
  @RelationId((tenancy_config: TenancyConfig) => tenancy_config.theme)
  theme_id: number;

  @Column({ type: 'varchar' })
  title: string;
}
