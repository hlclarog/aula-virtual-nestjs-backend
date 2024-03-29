import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Base } from '../../base/base.entity';
import { Modules } from '../acl/modules/modules.entity';
import { Tenancies } from '../tenancies/tenancies.entity';
import { TENANCY_MODULES_ENTITY } from './tenancy_modules.dto';

@Entity({ name: TENANCY_MODULES_ENTITY, schema: 'public' })
export class TenancyModules extends Base {
  @ManyToOne(() => Tenancies, (tenancies) => tenancies.tenancy_modules)
  @JoinColumn({ name: 'tenancy_id' })
  tenancy: Tenancies;

  @RelationId((tenancy_modules: TenancyModules) => tenancy_modules.tenancy)
  @Column({ type: 'integer' })
  tenancy_id: number;

  @ManyToOne(() => Modules, (modules) => modules.tenancy_modules)
  @JoinColumn({ name: 'module_id' })
  module: Modules;

  @RelationId((tenancy_modules: TenancyModules) => tenancy_modules.module)
  @Column({ type: 'integer' })
  module_id: number;
}
