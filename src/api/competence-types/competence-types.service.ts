import { Inject, Injectable } from '@nestjs/common';
import {
  CreateCompetenceTypeDto,
  UpdateCompetenceTypeDto,
  COMPETENCE_TYPES_PROVIDER,
} from './competence-types.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { CompetenceType } from './competence-type.entity';

@Injectable()
export class CompetenceTypesService extends BaseService<
  CompetenceType,
  CreateCompetenceTypeDto,
  UpdateCompetenceTypeDto
> {
  @Inject(COMPETENCE_TYPES_PROVIDER) repository: BaseRepo<CompetenceType>;
}
