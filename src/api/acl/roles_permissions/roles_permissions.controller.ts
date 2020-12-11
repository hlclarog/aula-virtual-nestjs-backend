import { Controller } from '@nestjs/common';
import { RolesPermissionsService } from './roles_permissions.service';
import {
  CreateRolesPermissionsDto,
  UpdateRolesPermissionsDto,
} from './roles_permissions.dto';
import { BaseController } from '../../../base/base.controller';
import { RolesPermissions } from './roles_permissions.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('roles_permissions')
@Controller('/api/roles_permissions')
export class RolesPermissionsController extends BaseController<
  RolesPermissions,
  CreateRolesPermissionsDto,
  UpdateRolesPermissionsDto
> {
  constructor(roles_permissionsService: RolesPermissionsService) {
    super(roles_permissionsService);
  }
}
