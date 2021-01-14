import { Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { Base } from '../../base/base.entity';
import { Modules } from '../acl/modules/modules.entity';
import { Plans } from '../plans/plans.entity';
import { PLAN_MODULES_ENTITY } from './plan_modules.dto';

@Entity({ name: PLAN_MODULES_ENTITY, schema: 'public' })
export class PlanModules extends Base {
  @ManyToOne(() => Plans, (plan) => plan.plan_modules)
  @JoinColumn({ name: 'plan_id' })
  plan: Plans;

  @RelationId((plan_modules: PlanModules) => plan_modules.plan)
  plan_id: number;

  @ManyToOne(() => Modules, (module) => module.plan_modules)
  @JoinColumn({ name: 'module_id' })
  module: Modules;

  @RelationId((plan_modules: PlanModules) => plan_modules.module)
  module_id: number;
}
