import { Inject, Injectable } from '@nestjs/common';
import {
  CreateIdentificationTypesDto,
  UpdateIdentificationTypesDto,
  IDENTIFICATION_TYPES_PROVIDER,
} from './identification_types.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base-repo';
import { IdentificationTypes } from './identification_types.entity';

@Injectable()
export class IdentificationTypesService extends BaseService<
  IdentificationTypes,
  CreateIdentificationTypesDto,
  UpdateIdentificationTypesDto
> {
  @Inject(IDENTIFICATION_TYPES_PROVIDER)
  repository: BaseRepo<IdentificationTypes>;
}
