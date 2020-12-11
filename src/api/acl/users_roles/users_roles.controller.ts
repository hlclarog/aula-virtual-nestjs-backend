import { Controller } from '@nestjs/common';
import { UsersRolesService } from './users_roles.service';
import { CreateUsersRolesDto, UpdateUsersRolesDto } from './users_roles.dto';
import { BaseController } from '../../../base/base.controller';
import { UsersRoles } from './users_roles.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users_roles')
@Controller('/api/users_roles')
export class UsersRolesController extends BaseController<
  UsersRoles,
  CreateUsersRolesDto,
  UpdateUsersRolesDto
> {
  constructor(users_rolesService: UsersRolesService) {
    super(users_rolesService);
  }
}
