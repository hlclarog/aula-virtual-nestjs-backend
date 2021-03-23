import { Inject, Injectable } from '@nestjs/common';
import {
  CreateIntegrationTypesDto,
  UpdateIntegrationTypesDto,
  INTEGRATION_TYPES_PROVIDER,
} from './integration_types.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { IntegrationTypes } from './integration_types.entity';

@Injectable()
export class IntegrationTypesService extends BaseService<
  IntegrationTypes,
  CreateIntegrationTypesDto,
  UpdateIntegrationTypesDto
> {
  @Inject(INTEGRATION_TYPES_PROVIDER)
  repository: BaseRepo<IntegrationTypes>;
}
