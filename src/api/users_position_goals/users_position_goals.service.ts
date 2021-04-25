import { Inject, Injectable } from '@nestjs/common';
import {
  CreateUsersPositionGoalsDto,
  UpdateUsersPositionGoalsDto,
  USERS_POSITION_GOALS_PROVIDER,
} from './users_position_goals.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { UsersPositionGoals } from './users_position_goals.entity';

@Injectable()
export class UsersPositionGoalsService extends BaseService<
  UsersPositionGoals,
  CreateUsersPositionGoalsDto,
  UpdateUsersPositionGoalsDto
> {
  @Inject(USERS_POSITION_GOALS_PROVIDER)
  repository: BaseRepo<UsersPositionGoals>;

  constructor() {
    super();
  }

  async set(idUser: number, positions: Array<number>): Promise<any> {
    const positionsList = positions.length > 0 ? positions.join() : [0].join();
    // DELETE ITEMS NOT RECEIVED
    await this.repository
      .createQueryBuilder()
      .delete()
      .from(UsersPositionGoals)
      .where(`user_id = :idUser and position_id not in (${positionsList})`, {
        idUser,
      })
      .execute();
    // SEARCH ITEMS ACTUALS FOR NO DUPLICATE
    const founds = await this.repository
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.position', 'position')
      .where(
        `item.user_id = :idUser and item.position_id in (${positionsList})`,
        {
          idUser,
        },
      )
      .getMany();
    // SAVE ITEMS NEWS
    const values: any[] = positions.map((p) => {
      return { user_id: idUser, position_id: p };
    });
    await this.repository
      .createQueryBuilder()
      .insert()
      .into(UsersPositionGoals)
      .values(
        values.filter((v) =>
          founds.map((f: any) => f.position.id).indexOf(v.position_id) >= 0
            ? false
            : true,
        ),
      )
      .execute();
    return { update: true };
  }
}
