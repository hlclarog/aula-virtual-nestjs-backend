import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  INFO_USER_PROVIDER,
  InfoUserProvider,
} from '../providers/info-user.module';

export const KeyPermissions = 'permissions_required';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    @Inject(INFO_USER_PROVIDER) private infoUser: InfoUserProvider,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<any>(
      KeyPermissions,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredPermissions) {
      return true;
    }
    let permissions = [];
    this.infoUser.roles.map((item) => {
      permissions = permissions.concat(
        item.rol.roles_permissions.map(
          (roles_permissions) => roles_permissions.permission.name,
        ),
      );
    });
    let match = false;
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
    console.log(requiredPermissions, permissions, match);
    return match;
  }
}
