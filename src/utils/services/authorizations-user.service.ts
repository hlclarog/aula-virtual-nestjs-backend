import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import {
  INFO_USER_PROVIDER,
  InfoUserProvider,
} from '../providers/info-user.module';

@Injectable()
export class AuthorizationsUserService {
  @Inject(INFO_USER_PROVIDER) private infoUser: InfoUserProvider;

  public async accesAction(
    requiredPermissions: string[],
    idUserPermitted: number,
  ) {
    let match = false;
    let permissions = [];
    this.infoUser.roles.map((item) => {
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
    if (!match && idUserPermitted != this.infoUser.id) {
      throw new ForbiddenException();
    }
  }
}
