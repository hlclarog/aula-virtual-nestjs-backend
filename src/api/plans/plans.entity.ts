import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from '../../base/base.entity';
import { PlanModules } from '../plan_modules/plan_modules.entity';
import { Tenancies } from '../tenancies/tenancies.entity';
import { PLANS_ENTITY } from './plans.dto';

@Entity({ name: PLANS_ENTITY, schema: 'public' })
export class Plans extends Base {
  @Column({ length: 500, type: 'varchar' })
  name: string;

  @Column({ length: 500, type: 'varchar' })
  description: string;

  @OneToMany(() => PlanModules, (plan_modules) => plan_modules.plan)
  plan_modules: PlanModules[];

  @OneToMany(() => Tenancies, (tenancy) => tenancy.plan)
  tenancies: Tenancies[];
}
