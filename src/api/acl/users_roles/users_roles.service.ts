import { Inject, Injectable } from '@nestjs/common';
import {
  CreateUsersRolesDto,
  UpdateUsersRolesDto,
  USERS_ROLES_PROVIDER,
} from './users_roles.dto';
import { BaseService } from '../../../base/base.service';
import { BaseRepo } from '../../../base/base.repository';
import { UsersRoles } from './users_roles.entity';
import { Like } from 'typeorm';

@Injectable()
export class UsersRolesService extends BaseService<
  UsersRoles,
  CreateUsersRolesDto,
  UpdateUsersRolesDto
> {
  @Inject(USERS_ROLES_PROVIDER) repository: BaseRepo<UsersRoles>;

  constructor() {
    super();
  }

  async findForUser(idUser: number): Promise<UsersRoles[]> {
    return this.repository.find({
      where: { user_id: idUser },
      relations: ['rol', 'rol.permissions'],
    });
  }

  async findForRolCode(rolName: string): Promise<UsersRoles[]> {
    return this.repository
      .createQueryBuilder('users_roles')
      .leftJoinAndSelect('users_roles.rol', 'rol')
      .leftJoinAndSelect('users_roles.user', 'user')
      .where('rol.name LIKE(:rolName)', { rolName: `${rolName}%` })
      .getMany();
  }

  async findRolDefault(idUser: number): Promise<UsersRoles> {
    return this.repository.findOne({
      where: { user_id: idUser, default: true },
      relations: ['rol'],
    });
  }

  async set(
    idUser: number,
    roles: Array<number>,
    rol_default?: number,
  ): Promise<any> {
    // DELETE ITEMS NOT RECEIVED
    await this.repository
      .createQueryBuilder()
      .delete()
      .from(UsersRoles)
      .where(
        `user_id = :idUser and rol_id not in (${
          roles.length > 0 ? roles.join() : [0].join()
        })`,
        {
          idUser,
        },
      )
      .execute();
    // SEARCH ITEMS ACTUALS FOR NO DUPLICATE
    const founds = await this.repository
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.rol', 'rol')
      .where(
        `item.user_id = :idUser and item.rol_id in (${
          roles.length > 0 ? roles.join() : [0].join()
        })`,
        {
          idUser,
        },
      )
      .getMany();
    // SAVE ITEMS NEWS
    const newItems: any[] = roles.map((p) => {
      return { user: idUser, rol: p, default: p == rol_default };
    });
    await this.repository
      .createQueryBuilder()
      .insert()
      .into(UsersRoles)
      .values(
        newItems.filter((v) =>
          founds.map((f: any) => f.rol.id).indexOf(v.rol) >= 0 ? false : true,
        ),
      )
      .execute();
    if (rol_default) {
      // SET MARKER DEFAULT ROL FOR DEFAULT TO USER
      await this.repository
        .createQueryBuilder()
        .update(UsersRoles)
        .set({ default: true })
        .where(`user_id = :idUser and rol_id = :idRol`, {
          idUser,
          idRol: rol_default,
        })
        .execute();
      // REMOVE MARKER DEFAULT OTHERS ROLES FOR USER
      const updateItems: any[] = roles
        .map((p) => {
          return { user_id: idUser, rol_id: p, default: p == rol_default };
        })
        .filter((f) => !f.default)
        .map((k) => k.rol_id);
      await this.repository
        .createQueryBuilder()
        .update(UsersRoles)
        .set({ default: false })
        .where(
          `user_id = :idUser and default = TRUE and rol_id in (${
            updateItems.length > 0 ? updateItems.join() : [0].join()
          })`,
          {
            idUser,
          },
        )
        .execute();
    }

    return { update: true };
  }
}
