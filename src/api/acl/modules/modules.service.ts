import { Inject, Injectable } from '@nestjs/common';
import {
  CreateModulesDto,
  UpdateModulesDto,
  MODULES_PROVIDER,
} from './modules.dto';
import { BaseService } from '../../../base/base.service';
import { BaseRepo } from '../../../base/base-repo';
import { Modules } from './modules.entity';

@Injectable()
export class ModulesService extends BaseService<
  Modules,
  CreateModulesDto,
  UpdateModulesDto
> {
  @Inject(MODULES_PROVIDER) repository: BaseRepo<Modules>;

  constructor() {
    super();
  }

  async findAll(): Promise<Modules[]> {
    return await this.repository.find({
      relations: ['parent', 'parent.parent'],
    });
  }

  async findOne(id: number): Promise<Modules> {
    return this.repository.findOneOrFail(id, {
      relations: [
        'parent',
        'parent.parent',
        'children',
        'children.parent',
        'permissions',
      ],
    });
  }
}
