import { Inject, Injectable } from '@nestjs/common';
import {
  CreateRolesPermissionsDto,
  UpdateRolesPermissionsDto,
  ROLES_PERMISSIONS_PROVIDER,
} from './roles_permissions.dto';
import { BaseService } from '../../../base/base.service';
import { BaseRepo } from '../../../base/base.repository';
import { RolesPermissions } from './roles_permissions.entity';

@Injectable()
export class RolesPermissionsService extends BaseService<
  RolesPermissions,
  CreateRolesPermissionsDto,
  UpdateRolesPermissionsDto
> {
  @Inject(ROLES_PERMISSIONS_PROVIDER) repository: BaseRepo<RolesPermissions>;

  constructor() {
    super();
  }

  async set(idRol: number, permissions: Array<number>): Promise<any> {
    const permissionsList =
      permissions.length > 0 ? permissions.join() : [0].join();
    // DELETE ITEMS NOT RECEIVED
    await this.repository
      .createQueryBuilder()
      .delete()
      .from(RolesPermissions)
      .where(`rol_id = :idRol and permission_id not in (${permissionsList})`, {
        idRol,
      })
      .execute();
    // SEARCH ITEMS ACTUALS FOR NO DUPLICATE
    const founds = await this.repository
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.permission', 'permission')
      .where(
        `item.rol_id = :idRol and item.permission_id in (${permissionsList})`,
        {
          idRol,
        },
      )
      .getMany();
    // SAVE ITEMS NEWS
    const values: any[] = permissions.map((p) => {
      return { rol_id: idRol, permission_id: p };
    });
    await this.repository
      .createQueryBuilder()
      .insert()
      .into(RolesPermissions)
      .values(
        values.filter((v) =>
          founds.map((f: any) => f.permission.id).indexOf(v.permission_id) >= 0
            ? false
            : true,
        ),
      )
      .execute();
    return { update: true };
  }
}
