import { Inject, Injectable } from '@nestjs/common';
import { CreateUsersDto, UpdateUsersDto, USERS_PROVIDER } from './users.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base-repo';
import { Users } from './users.entity';
import { CryptoService } from './../../services/crypto.service';
import { ChangePasswordDto, LoginDto } from './../../auth/auth.dto';

@Injectable()
export class UsersService extends BaseService<
  Users,
  CreateUsersDto,
  UpdateUsersDto
> {
  @Inject(USERS_PROVIDER) repository: BaseRepo<Users>;

  constructor(private cryptoService: CryptoService) {
    super();
  }

  async create(createDto: CreateUsersDto) {
    createDto.password = this.cryptoService.hashPassword(createDto.password);
    return await this.repository.save(createDto);
  }

  async findByEmail(email: string) {
    return await this.repository.findOne({ where: { email } });
  }

  async verifyUser(loginDto: LoginDto) {
    loginDto.password = this.cryptoService.hashPassword(loginDto.password);
    return await this.repository.findOne({ where: loginDto });
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    changePasswordDto.password = this.cryptoService.hashPassword(
      changePasswordDto.password,
    );
    return await this.repository.update(changePasswordDto.id, {
      password: changePasswordDto.password,
    });
  }
}
