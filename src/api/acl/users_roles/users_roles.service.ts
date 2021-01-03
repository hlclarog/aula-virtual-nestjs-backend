import { Inject, Injectable } from '@nestjs/common';
import {
  CreateUsersRolesDto,
  UpdateUsersRolesDto,
  USERS_ROLES_PROVIDER,
} from './users_roles.dto';
import { BaseService } from '../../../base/base.service';
import { BaseRepo } from '../../../base/base.repository';
import { UsersRoles } from './users_roles.entity';

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

  async findAll(): Promise<UsersRoles[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<UsersRoles> {
    return this.repository.findOneOrFail(id);
  }

  async findForUser(idUser: number): Promise<UsersRoles[]> {
    return this.repository.find({
      where: { user: idUser },
      relations: ['rol', 'rol.permissions'],
    });
  }

  async findRolDefault(idUser: number): Promise<UsersRoles> {
    return this.repository.findOne({
      where: { user: idUser, default: true },
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
        `userId = :idUser and rolId not in (${
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
        `item.userId = :idUser and item.rolId in (${
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
        .where(`userId = :idUser and rolId = :idRol`, {
          idUser,
          idRol: rol_default,
        })
        .execute();
      // REMOVE MARKER DEFAULT OTHERS ROLES FOR USER
      const updateItems: any[] = roles
        .map((p) => {
          return { user: idUser, rol: p, default: p == rol_default };
        })
        .filter((f) => !f.default)
        .map((k) => k.rol);
      await this.repository
        .createQueryBuilder()
        .update(UsersRoles)
        .set({ default: false })
        .where(
          `userId = :idUser and default = TRUE and rolId in (${
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
