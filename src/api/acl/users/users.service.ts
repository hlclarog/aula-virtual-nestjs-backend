import { Inject, Injectable } from '@nestjs/common';
import { CreateUsersDto, UpdateUsersDto, USERS_PROVIDER } from './users.dto';
import { BaseService } from '../../../base/base.service';
import { BaseRepo } from '../../../base/base.repository';
import { Users } from './users.entity';
import { CryptoService } from '../../../utils/services/crypto.service';
import { ChangePasswordDto, LoginDto } from '../../../auth/auth.dto';
import { UpdateResult } from 'typeorm';
import { UsersRolesService } from '../users_roles/users_roles.service';
import {
  INFO_USER_PROVIDER,
  InfoUserProvider,
} from './../../../utils/providers/info-user.module';
import { AwsService } from './../../../aws/aws.service';
import { typeFilesAwsNames } from './../../../aws/aws.dto';
import * as shortid from 'shortid';

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
    @Inject(INFO_USER_PROVIDER) private infoUser: InfoUserProvider,
    private awsService: AwsService,
  ) {
    super();
  }

  async findForRol(rolCode): Promise<Users[]> {
    return await (await this.usersRolesService.findForRolCode(rolCode)).map(
      (r) => r.user,
    );
  }

  async findOne(id: number): Promise<Users> {
    const user = await this.repository.findOneOrFail(id, {
      relations: ['users_roles', 'users_roles.rol', 'theme'],
    });
    if (user.picture) {
      user.picture = await this.awsService.getFile(user.picture);
    }
    return user;
  }

  async findRoles(id: number) {
    return this.usersRolesService.findForUser(id);
  }

  async create(createDto: CreateUsersDto) {
    const data: any = Object.assign({}, createDto);
    data.password = this.cryptoService.hashPassword(data.password);
    delete data.users_roles;
    delete data.rol_default;
    const dataNew = await this.repository.save(data);
    if (createDto.users_roles) {
      await this.usersRolesService.set(
        dataNew.id,
        createDto.users_roles,
        createDto.rol_default,
      );
    }
    return dataNew;
  }

  async update(id: number, updateDto: UpdateUsersDto): Promise<UpdateResult> {
    const data: any = Object.assign({}, updateDto);
    delete data.users_roles;
    delete data.rol_default;
    if (updateDto.picture) {
      data.picture = await this.setAvatar(updateDto.picture);
    }
    if (updateDto.users_roles) {
      await this.usersRolesService.set(
        id,
        updateDto.users_roles,
        updateDto.rol_default,
      );
    }
    return await this.repository.update(id, data);
  }

  async setAvatar(file) {
    const result = await this.awsService.saveFile({
      file,
      name: shortid.generate(),
      type: typeFilesAwsNames.users,
    });
    return result.Key;
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

  async profile() {
    const data = await this.findOne(this.infoUser.id);
    const rolDefault = await this.usersRolesService.findRolDefault(
      this.infoUser.id,
    );
    return {
      ...data,
      rol_default: rolDefault.rol,
      rol_default_id: rolDefault.rol.id,
    };
  }

  async searchByRol(idRol: number, text: string): Promise<any> {
    return await this.repository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.users_roles', 'users_roles')
      .leftJoinAndSelect('users_roles.rol', 'rol')
      .where(
        'LOWER(user.name) LIKE(LOWER(:text)) OR' +
          ' LOWER(user.email) LIKE(LOWER(:text)) OR' +
          ' LOWER(user.phone) LIKE(LOWER(:text)) OR' +
          ' LOWER(user.lastname) LIKE(LOWER(:text)) OR' +
          ' LOWER(user.identification) LIKE(LOWER(:text)) AND' +
          ' users_roles.rol_id = :idRol',
        {
          text: `%${text}%`,
          idRol: `${idRol}`,
        },
      )
      .getMany();
  }
}
