import { Inject, Injectable } from '@nestjs/common';
import { CreateUsersDto, UpdateUsersDto, USERS_PROVIDER } from './users.dto';
import { BaseService } from '../../../base/base.service';
import { BaseRepo } from '../../../base/base.repository';
import { Users } from './users.entity';
import { CryptoService } from '../../../utils/services/crypto.service';
import { ChangePasswordDto, LoginDto } from '../../../auth/auth.dto';
import { UpdateResult } from 'typeorm';
import { UsersRolesService } from '../users_roles/users_roles.service';

@Injectable()
export class UsersService extends BaseService<
  Users,
  CreateUsersDto,
  UpdateUsersDto
> {
  @Inject(USERS_PROVIDER) repository: BaseRepo<Users>;

  constructor(
    private cryptoService: CryptoService,
    private usersRolesService: UsersRolesService,
  ) {
    super();
  }

  async findOne(id: number): Promise<Users> {
    return this.repository.findOneOrFail(id, {
      relations: ['users_roles'],
    });
  }

  async findRoles(id: number) {
    return this.usersRolesService.findForUser(id);
  }

  async create(createDto: CreateUsersDto) {
    const data: any = Object.assign({}, createDto);
    data.password = this.cryptoService.hashPassword(data.password);
    delete data.users_roles;
    const dataNew = await this.repository.save(data);
    if (createDto.users_roles) {
      await this.usersRolesService.set(dataNew.id, createDto.users_roles);
    }
    return dataNew;
  }

  async update(id: number, updateDto: UpdateUsersDto): Promise<UpdateResult> {
    const data: any = Object.assign({}, updateDto);
    delete data.users_roles;
    if (updateDto.users_roles) {
      await this.usersRolesService.set(id, updateDto.users_roles);
    }
    return await this.repository.update(id, data);
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
