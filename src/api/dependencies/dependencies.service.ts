import { Inject, Injectable } from '@nestjs/common';
import {
  CreateDependenciesDto,
  UpdateDependenciesDto,
  DEPENDENCIES_PROVIDER,
} from './dependencies.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { Dependencies } from './dependencies.entity';

@Injectable()
export class DependenciesService extends BaseService<
  Dependencies,
  CreateDependenciesDto,
  UpdateDependenciesDto
> {
  constructor() {
    super();
  }
  @Inject(DEPENDENCIES_PROVIDER) repository: BaseRepo<Dependencies>;
}
