import { Inject, Injectable } from '@nestjs/common';
import {
  CreateTenancyModulesDto,
  UpdateTenancyModulesDto,
  TENANCY_MODULES_PROVIDER,
  CreateTenancyModulesCreateGroupDto,
} from './tenancy_modules.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { TenancyModules } from './tenancy_modules.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class TenancyModulesService extends BaseService<
  TenancyModules,
  CreateTenancyModulesDto,
  UpdateTenancyModulesDto
> {
  @Inject(TENANCY_MODULES_PROVIDER) repository: BaseRepo<TenancyModules>;

  async findByTenancy(id: number): Promise<TenancyModules[]> {
    return await this.repository.find({ where: { tenancy_id: id } });
  }

  async set(createDto: CreateTenancyModulesCreateGroupDto): Promise<any> {
    const tenanciesList =
      createDto.tenancies.length > 0 ? createDto.tenancies.join() : [0].join();
    const modulesList =
      createDto.modules.length > 0 ? createDto.modules.join() : [0].join();
    const founds = await this.repository
      .createQueryBuilder('item')
      .where(
        `item.tenancy_id in (${tenanciesList}) AND item.module_id in (${modulesList})`,
      )
      .getMany();
    const values: any[] = [];
    createDto.tenancies.map((idTenancy) => {
      createDto.modules.map((idModule) => {
        const count = founds.filter(
          (f) => f.module_id == idModule && f.tenancy_id == idTenancy,
        ).length;
        if (!count) {
          values.push({ tenancy_id: idTenancy, module_id: idModule });
        }
      });
    });
    await this.repository
      .createQueryBuilder()
      .insert()
      .into(TenancyModules)
      .values(values)
      .execute();
    return { update: true };
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}
