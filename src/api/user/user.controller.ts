import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { BaseController } from '../../base/base.controller';
import { User } from './entities/user.entity';

@Controller('/api/user')
export class UserController extends BaseController<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(userService: UserService) {
    super(userService);
  }
}
