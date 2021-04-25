import { Inject, Injectable } from '@nestjs/common';
import {
  CreatePositionsDto,
  UpdatePositionsDto,
  POSITIONS_PROVIDER,
} from './positions.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { Positions } from './positions.entity';
import { PositionCompetencesService } from '../position_competences/position_competences.service';

@Injectable()
export class PositionsService extends BaseService<
  Positions,
  CreatePositionsDto,
  UpdatePositionsDto
> {
  constructor(private positionCompetencesService: PositionCompetencesService) {
    super();
  }
  @Inject(POSITIONS_PROVIDER) repository: BaseRepo<Positions>;

  async create(createDto: CreatePositionsDto) {
    const data = Object.assign({}, createDto);
    delete data.competences;
    const result = await this.repository.save(data);
    if (createDto.competences) {
      this.positionCompetencesService.set(result.id, createDto.competences);
    }
    return result;
  }

  async update(id: number, updateDto: UpdatePositionsDto) {
    const data = Object.assign({}, updateDto);
    delete data.competences;
    if (updateDto.competences) {
      this.positionCompetencesService.set(id, updateDto.competences);
    }
    return await this.repository.update(id, data);
  }
}
