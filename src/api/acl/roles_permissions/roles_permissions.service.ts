import { Inject, Injectable } from '@nestjs/common';
import {
  CreateRolesPermissionsDto,
  UpdateRolesPermissionsDto,
  ROLES_PERMISSIONS_PROVIDER,
} from './roles_permissions.dto';
import { BaseService } from '../../../base/base.service';
import { BaseRepo } from '../../../base/base-repo';
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

  async findAll(): Promise<RolesPermissions[]> {
    return await this.repository.find({
      relations: ['parent', 'parent.parent'],
    });
  }

  async findOne(id: number): Promise<RolesPermissions> {
    return this.repository.findOneOrFail(id, {
      relations: [
        'parent',
        'parent.parent',
        'children',
        'children.parent',
        'permissions',
      ],
    });
  }

  async set(idRol: number, permissions: Array<number>): Promise<any> {
    // DELETE ITEMS NOT RECEIVED
    await this.repository
      .createQueryBuilder()
      .delete()
      .from(RolesPermissions)
      .where('rolId = :idRol and permissionId not in (:permissions)', {
        idRol,
        permissions: permissions.length > 0 ? permissions.join() : [0].join(),
      })
      .execute();
    // SEARCH ITEMS ACTUALS FOR NO DUPLICATE
    const founds = await this.repository
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.permission', 'permission')
      .where('item.rolId = :idRol and item.permissionId in (:permissions)', {
        idRol,
        permissions: permissions.length > 0 ? permissions.join() : [0].join(),
      })
      .getMany();
    // SAVE ITEMS NEWS
    const values: any[] = permissions.map((p) => {
      return { rol: idRol, permission: p };
    });
    await this.repository
      .createQueryBuilder()
      .insert()
      .into(RolesPermissions)
      .values(
        values.filter((v) =>
          founds.map((f: any) => f.permission.id).indexOf(v.permission) >= 0
            ? false
            : true,
        ),
      )
      .execute();
    return { update: true };
  }
}
