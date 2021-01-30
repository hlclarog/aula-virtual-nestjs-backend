import { Inject, Injectable } from '@nestjs/common';
import {
  CreateResourceTypesDto,
  UpdateResourceTypesDto,
  RESOURCE_TYPES_PROVIDER,
} from './resource_types.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { ResourceTypes } from './resource_types.entity';

@Injectable()
export class ResourceTypesService extends BaseService<
  ResourceTypes,
  CreateResourceTypesDto,
  UpdateResourceTypesDto
> {
  @Inject(RESOURCE_TYPES_PROVIDER) repository: BaseRepo<ResourceTypes>;
}
