import { Controller } from '@nestjs/common';
import { IdentificationTypesService } from './identification_types.service';
import {
  CreateIdentificationTypesDto,
  UpdateIdentificationTypesDto,
} from './identification_types.dto';
import { BaseController } from '../../base/base.controller';
import { IdentificationTypes } from './identification_types.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('identification_types')
@Controller('/api/identification_types')
export class IdentificationTypesController extends BaseController<
  IdentificationTypes,
  CreateIdentificationTypesDto,
  UpdateIdentificationTypesDto
> {
  constructor(identification_typesService: IdentificationTypesService) {
    super(identification_typesService);
  }
}
