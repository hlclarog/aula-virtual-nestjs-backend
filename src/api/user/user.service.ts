import { Inject, Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  UpdateUserDto,
  USER_PROVIDER,
} from './dto/create-user.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base-repo';
import { User } from './entities/user.entity';

@Injectable()
export class UserService extends BaseService<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  @Inject(USER_PROVIDER) private userRepo: BaseRepo<User>;
  getRepo(): BaseRepo<User> {
    return this.userRepo;
  }
}
