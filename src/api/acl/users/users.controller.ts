import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto, UpdateUsersDto } from './users.dto';
import { BaseController } from '../../../base/base.controller';
import { Users } from './users.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('/api/users')
export class UsersController extends BaseController<
  Users,
  CreateUsersDto,
  UpdateUsersDto
> {
  constructor(usersService: UsersService) {
    super(usersService);
  }
}
