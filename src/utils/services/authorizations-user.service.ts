import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { UsersRolesService } from './../../api/acl/users_roles/users_roles.service';
import {
  INFO_USER_PROVIDER,
  InfoUserProvider,
} from '../providers/info-user.module';

@Injectable()
export class AuthorizationsUserService {
  constructor(private usersRolesService: UsersRolesService) {}
  @Inject(INFO_USER_PROVIDER) private infoUser: InfoUserProvider;

  public async accesActionUserMatch(
    requiredPermissions: string[],
    idUserPermitted: number,
  ) {
    const match = await this.validAction(requiredPermissions, this.infoUser.id);
    if (!match && idUserPermitted != this.infoUser.id) {
      throw new ForbiddenException();
    }
  }
  public async validAction(
    requiredPermissions: string[],
    idUserPermitted: number,
  ) {
    let match = false;
    let permissions = [];
    const infoRoles = await this.usersRolesService.getInfoRolUser(
      idUserPermitted,
    );
    infoRoles.map((item) => {
      permissions = permissions.concat(
        item.rol.roles_permissions.map(
          (roles_permissions: any) => roles_permissions.permission.name,
        ),
      );
    });
    let i = 0;
    let k = 0;
    while (!match && i < requiredPermissions.length) {
      while (!match && k < permissions.length) {
        if (requiredPermissions[i] === permissions[k]) {
          match = true;
        }
        k++;
      }
      i++;
    }
    return match;
  }
  public async accesAction(
    requiredPermissions: string[],
    idUserPermitted: number,
  ) {
    const match = await this.validAction(requiredPermissions, idUserPermitted);
    if (!match) {
      throw new ForbiddenException();
    }
    return match;
  }
}
