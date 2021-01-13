import { Inject, Injectable } from '@nestjs/common';
import { COMPETENCES_PROVIDER, CreateCompentenceDto, UpdateCompetenceDto } from './competences.dto';
import { BaseService } from '../../base/base.service';
import { Competence } from './competence.entity';
import { BaseRepo } from '../../base/base.repository';
@Injectable()
export class CompetencesService extends BaseService<
  Competence,
  CreateCompentenceDto,
  UpdateCompetenceDto
> {
  @Inject(COMPETENCES_PROVIDER) repository: BaseRepo<Competence>;
}
