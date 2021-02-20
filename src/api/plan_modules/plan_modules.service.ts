import { Inject, Injectable } from '@nestjs/common';
import {
  CreatePlanModulesDto,
  UpdatePlanModulesDto,
  PLAN_MODULES_PROVIDER,
} from './plan_modules.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { PlanModules } from './plan_modules.entity';

@Injectable()
export class PlanModulesService extends BaseService<
  PlanModules,
  CreatePlanModulesDto,
  UpdatePlanModulesDto
> {
  @Inject(PLAN_MODULES_PROVIDER) repository: BaseRepo<PlanModules>;

  async set(idPlan: number, modules: Array<number>): Promise<any> {
    if (modules) {
      const modulesList = modules.length > 0 ? modules.join() : [0].join();
      // DELETE ITEMS NOT RECEIVED
      await this.repository
        .createQueryBuilder()
        .delete()
        .from(PlanModules)
        .where(`plan_id = :idPlan and module_id not in (${modulesList})`, {
          idPlan,
        })
        .execute();
      // SEARCH ITEMS ACTUALS FOR NO DUPLICATE
      const founds = await this.repository
        .createQueryBuilder('item')
        .leftJoinAndSelect('item.module', 'module')
        .where(
          `item.plan_id = :idPlan and item.module_id in (${modulesList})`,
          {
            idPlan,
          },
        )
        .getMany();
      // SAVE ITEMS NEWS
      const values: any[] = modules.map((p) => {
        return { rol_id: idPlan, module_id: p };
      });
      await this.repository
        .createQueryBuilder()
        .insert()
        .into(PlanModules)
        .values(
          values.filter((v) =>
            founds.map((f: any) => f.module.id).indexOf(v.module_id) >= 0
              ? false
              : true,
          ),
        )
        .execute();
    }
    return { update: true };
  }
}
