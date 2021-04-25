import { Inject, Injectable } from '@nestjs/common';
import {
  CreatePositionCompetencesDto,
  UpdatePositionCompetencesDto,
  POSITIONS_COMPETENCES_PROVIDER,
} from './position_competences.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { PositionCompetences } from './position_competences.entity';

@Injectable()
export class PositionCompetencesService extends BaseService<
  PositionCompetences,
  CreatePositionCompetencesDto,
  UpdatePositionCompetencesDto
> {
  @Inject(POSITIONS_COMPETENCES_PROVIDER)
  repository: BaseRepo<PositionCompetences>;

  constructor() {
    super();
  }

  async set(positionId: number, competences: Array<number>): Promise<any> {
    const competencesList =
      competences.length > 0 ? competences.join() : [0].join();
    // DELETE ITEMS NOT RECEIVED
    await this.repository
      .createQueryBuilder()
      .delete()
      .from(PositionCompetences)
      .where(
        `position_id = :positionId and competence_id not in (${competencesList})`,
        {
          positionId,
        },
      )
      .execute();
    // SEARCH ITEMS ACTUALS FOR NO DUPLICATE
    const founds = await this.repository
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.competence', 'competence')
      .where(
        `item.position_id = :positionId and item.competence_id in (${competencesList})`,
        {
          positionId,
        },
      )
      .getMany();
    // SAVE ITEMS NEWS
    const values: any[] = competences.map((p) => {
      return { position_id: positionId, competence_id: p };
    });
    await this.repository
      .createQueryBuilder()
      .insert()
      .into(PositionCompetences)
      .values(
        values.filter((v) =>
          founds.map((f: any) => f.competence.id).indexOf(v.competence_id) >= 0
            ? false
            : true,
        ),
      )
      .execute();
    return { update: true };
  }
}
