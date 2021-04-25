import { Inject, Injectable } from '@nestjs/common';
import {
  CreateUsersCompetencesDto,
  UpdateUsersCompetencesDto,
  USERS_COMPETENCES_PROVIDER,
} from './users_competences.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { UsersCompetences } from './users_competences.entity';

@Injectable()
export class UsersCompetencesService extends BaseService<
  UsersCompetences,
  CreateUsersCompetencesDto,
  UpdateUsersCompetencesDto
> {
  @Inject(USERS_COMPETENCES_PROVIDER)
  repository: BaseRepo<UsersCompetences>;

  constructor() {
    super();
  }

  async set(idUser: number, competences: Array<number>): Promise<any> {
    const competencesList =
      competences.length > 0 ? competences.join() : [0].join();
    // DELETE ITEMS NOT RECEIVED
    await this.repository
      .createQueryBuilder()
      .delete()
      .from(UsersCompetences)
      .where(
        `user_id = :idUser and competence_id not in (${competencesList})`,
        {
          idUser,
        },
      )
      .execute();
    // SEARCH ITEMS ACTUALS FOR NO DUPLICATE
    const founds = await this.repository
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.competence', 'competence')
      .where(
        `item.user_id = :idUser and item.competence_id in (${competencesList})`,
        {
          idUser,
        },
      )
      .getMany();
    // SAVE ITEMS NEWS
    const values: any[] = competences.map((p) => {
      return { user_id: idUser, competence_id: p };
    });
    await this.repository
      .createQueryBuilder()
      .insert()
      .into(UsersCompetences)
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
