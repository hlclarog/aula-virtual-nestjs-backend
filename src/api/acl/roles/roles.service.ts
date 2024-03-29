import { Inject, Injectable } from '@nestjs/common';
import {
  CreateRolesDto,
  UpdateRolesDto,
  ROLES_PROVIDER,
  Menu,
} from './roles.dto';
import { BaseService } from '../../../base/base.service';
import { BaseRepo } from '../../../base/base.repository';
import { Roles } from './roles.entity';
import { In, Like, UpdateResult } from 'typeorm';
import { RolesPermissionsService } from '../roles_permissions/roles_permissions.service';
import {
  INFO_USER_PROVIDER,
  InfoUserProvider,
} from './../../../utils/providers/info-user.module';
import { Modules } from '../modules/modules.entity';
import { PERMISSIONS_PROVIDER } from '../permissions/permissions.dto';
import { Permissions } from '../permissions/permissions.entity';
import { TENANCY_MODULES_PROVIDER } from './../../tenancy_modules/tenancy_modules.dto';
import { TenancyModules } from './../../tenancy_modules/tenancy_modules.entity';
import { MODULES_PROVIDER } from '../modules/modules.dto';
import { PermissionsService } from '../permissions/permissions.service';

@Injectable()
export class RolesService extends BaseService<
  Roles,
  CreateRolesDto,
  UpdateRolesDto
> {
  @Inject(ROLES_PROVIDER) repository: BaseRepo<Roles>;
  @Inject(PERMISSIONS_PROVIDER) repositoryPermissions: BaseRepo<Permissions>;
  @Inject(TENANCY_MODULES_PROVIDER)
  repositoryTenanciesModules: BaseRepo<TenancyModules>;
  @Inject(MODULES_PROVIDER) repositoryModules: BaseRepo<Modules>;

  constructor(
    private rolesPermissionsService: RolesPermissionsService,
    private permissionService: PermissionsService,
    @Inject(INFO_USER_PROVIDER) private infoUser: InfoUserProvider,
  ) {
    super();
  }

  async findAll(): Promise<Roles[]> {
    return await this.repository.find({
      relations: ['roles_permissions'],
    });
  }

  async findOne(id: number) {
    const result = await this.repository.findOneOrFail(id, {
      relations: ['roles_permissions'],
    });
    const permissions = await this.permissionService.findForTenancy();
    result?.roles_permissions.map((item) => {
      permissions.map((permission) => {

      })
    });

    return result;
  }

  async create(createDto: CreateRolesDto) {
    const data: any = Object.assign({}, createDto);
    delete data.roles_permissions;
    const dataNew = await this.repository.save(data);
    await this.rolesPermissionsService.set(
      dataNew.id,
      createDto.roles_permissions,
    );
    return dataNew;
  }

  async update(id: number, updateDto: UpdateRolesDto): Promise<UpdateResult> {
    const data: any = Object.assign({}, updateDto);
    delete data.roles_permissions;
    await this.rolesPermissionsService.set(id, updateDto.roles_permissions);
    return await this.repository.update(id, data);
  }

  async menuUser() {
    const dataMenu = [];
    for (let i = 0; i < this.infoUser.roles.length; i++) {
      const rolElement = this.infoUser.roles[i];
      const permissionsListIds = rolElement.rol.roles_permissions.map(
        (rolPer) => rolPer.permission_id,
      );
      const modulesTenancy = await (
        await this.repositoryTenanciesModules.find()
      ).map((item) => item.module_id);
      const modules = await this.repositoryModules.find({
        select: [
          'id',
          'name',
          'translate',
          'path',
          'parent',
          'display_order',
          'show_in_menu',
        ],
        relations: ['permissions', 'children', 'children.children'],
        where: { parent_id: null, id: In(modulesTenancy) },
      });
      const permisos = await this.repositoryPermissions.find({
        select: ['id', 'name', 'display_name', 'description'],
        relations: ['module'],
        where: { id: In(permissionsListIds), name: Like('view-%') },
      });
      const menu = this.filtchilds(modules, permisos, '', []);
      dataMenu.push({
        id: rolElement.rol.id,
        name: rolElement.rol.name,
        default: rolElement.default,
        menu,
      });
    }
    return dataMenu;
  }

  filtchilds(list: Modules[], permisos: Permissions[], path, result) {
    for (let i = 0; i < list.length; i++) {
      const element: Modules | any = list[i];
      const daty: Menu = {
        id: element.id,
        title: element.translate,
        translate: element.translate,
        icon: element.icon,
        url: `${path}/${element.path}`,
        type: element.parent_id ? 'collapsable' : 'group',
        view: this.validPermission(permisos, element.id).view,
        children: [],
      };
      if (element.children && element.children.length > 0) {
        daty.children = this.filtchilds(
          element.children,
          permisos,
          daty.url,
          daty.children,
        );
        daty.view = daty.children.filter((c) => c.view === true).length > 0;
        delete daty.url;
      } else {
        daty.type = 'item';
      }
      if (daty.view) result.push(daty);
    }
    return result;
  }

  validPermission(permisos: Permissions[], id) {
    const filt = permisos.filter((p) => p.module.id === id);
    if (filt.length > 0) {
      return {
        view: true,
        data: permisos[0],
      };
    } else {
      return {
        view: false,
        data: {},
      };
    }
  }
}
