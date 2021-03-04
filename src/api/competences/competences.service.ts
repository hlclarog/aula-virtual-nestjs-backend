import { Inject, Injectable } from '@nestjs/common';
import {
  COMPETENCES_PROVIDER,
  CreateCompentenceDto,
  UpdateCompetenceDto,
} from './competences.dto';
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

  async findAll(): Promise<Competence[]> {
    return await this.repository
      .createQueryBuilder('competence')
      .select([
        'competence.id',
        'competence.description',
        'competence.active',
        'competence.competence_type_id',
        'competence_type.id',
        'competence_type.description',
      ])
      .leftJoin('competence.competence_type', 'competence_type')
      .getMany();
  }
}
