import { Inject, Injectable } from '@nestjs/common';
import { CreatePlansDto, UpdatePlansDto, PLANS_PROVIDER } from './plans.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { Plans } from './plans.entity';
import { PlanModulesService } from '../plan_modules/plan_modules.service';
import { UpdateResult } from 'typeorm';

@Injectable()
export class PlansService extends BaseService<
  Plans,
  CreatePlansDto,
  UpdatePlansDto
> {
  @Inject(PLANS_PROVIDER) repository: BaseRepo<Plans>;

  constructor(private planModulesService: PlanModulesService) {
    super();
  }

  async findOne(id: number): Promise<Plans> {
    return this.repository.findOneOrFail(id, { relations: ['plan_modules'] });
  }

  async create(createDto: CreatePlansDto) {
    const data: any = Object.assign({}, createDto);
    delete data.plan_modules;
    const dataNew = await this.repository.save(data);
    await this.planModulesService.set(dataNew.id, createDto.plan_modules);
    return dataNew;
  }

  async update(id: number, updateDto: UpdatePlansDto): Promise<UpdateResult> {
    const data: any = Object.assign({}, updateDto);
    delete data.plan_modules;
    await this.planModulesService.set(id, updateDto.plan_modules);
    return await this.repository.update(id, data);
  }
}
