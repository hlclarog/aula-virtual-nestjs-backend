import { Controller } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionsDto, UpdatePermissionsDto } from './permissions.dto';
import { BaseController } from '../../../base/base.controller';
import { Permissions } from './permissions.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('permissions')
@Controller('/api/permissions')
export class PermissionsController extends BaseController<
  Permissions,
  CreatePermissionsDto,
  UpdatePermissionsDto
> {
  constructor(permissionsService: PermissionsService) {
    super(permissionsService);
  }
}
