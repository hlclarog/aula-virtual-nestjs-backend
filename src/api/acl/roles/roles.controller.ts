import { Controller } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRolesDto, UpdateRolesDto } from './roles.dto';
import { BaseController } from '../../../base/base.controller';
import { Roles } from './roles.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('roles')
@Controller('/api/roles')
export class RolesController extends BaseController<
  Roles,
  CreateRolesDto,
  UpdateRolesDto
> {
  constructor(rolesService: RolesService) {
    super(rolesService);
  }
}
