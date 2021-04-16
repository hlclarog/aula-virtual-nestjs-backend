import { Inject, Injectable } from '@nestjs/common';
import {
  CreateUsersOrganizationsDto,
  UpdateUsersOrganizationsDto,
  USERS_ORGANIZATIONS_PROVIDER,
} from './users_organizations.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { UsersOrganizations } from './users_organizations.entity';

@Injectable()
export class UsersOrganizationsService extends BaseService<
  UsersOrganizations,
  CreateUsersOrganizationsDto,
  UpdateUsersOrganizationsDto
> {
  @Inject(USERS_ORGANIZATIONS_PROVIDER)
  repository: BaseRepo<UsersOrganizations>;

  constructor() {
    super();
  }

  async findByUser(user_id: number): Promise<UsersOrganizations[]> {
    return await this.repository.find({ user_id });
  }

  async set(idUser: number, organizations: Array<number>): Promise<any> {
    const organizationsList =
      organizations.length > 0 ? organizations.join() : [0].join();
    // DELETE ITEMS NOT RECEIVED
    await this.repository
      .createQueryBuilder()
      .delete()
      .from(UsersOrganizations)
      .where(
        `user_id = :idUser and organization_id not in (${organizationsList})`,
        {
          idUser,
        },
      )
      .execute();
    // SEARCH ITEMS ACTUALS FOR NO DUPLICATE
    const founds = await this.repository
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.organization', 'organization')
      .where(
        `item.user_id = :idUser and item.organization_id in (${organizationsList})`,
        {
          idUser,
        },
      )
      .getMany();
    // SAVE ITEMS NEWS
    const values: any[] = organizations.map((p) => {
      return { user_id: idUser, organization_id: p };
    });
    await this.repository
      .createQueryBuilder()
      .insert()
      .into(UsersOrganizations)
      .values(
        values.filter((v) =>
          founds
            .map((f: any) => f.organization.id)
            .indexOf(v.organization_id) >= 0
            ? false
            : true,
        ),
      )
      .execute();
    return { update: true };
  }
}
