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
import { durationFilesUrl, typeFilesAwsNames } from './../../../aws/aws.dto';
import * as shortid from 'shortid';
import { getActualDate } from './../../../utils/date';
import { TenancyConfigService } from './../../tenancy_config/tenancy_config.service';
import {
  INFO_TENANCY_PROVIDER,
  InfoTenancyDomain,
} from './../../../utils/providers/info-tenancy.module';
import { PointsUserLogService } from './../../points_user_log/points_user_log.service';
import { UsersOrganizationsService } from './../../users_organizations/users_organizations.service';
import { UsersCompetencesService } from './../../users_competences/users_competences.service';
import { UsersPositionGoalsService } from './../../users_position_goals/users_position_goals.service';

@Injectable()
export class UsersService extends BaseService<
  Users,
  CreateUsersDto,
  UpdateUsersDto
> {
  @Inject(USERS_PROVIDER) repository: BaseRepo<Users>;
  @Inject(INFO_TENANCY_PROVIDER) private tenancy: InfoTenancyDomain;

  constructor(
    @Inject(INFO_USER_PROVIDER) private infoUser: InfoUserProvider,
    private cryptoService: CryptoService,
    private usersRolesService: UsersRolesService,
    private tenancyConfigService: TenancyConfigService,
    private pointsUserLogService: PointsUserLogService,
    private awsService: AwsService,
    private usersOrganizationsService: UsersOrganizationsService,
    private usersCompetencesService: UsersCompetencesService,
    private usersPositionGoalsService: UsersPositionGoalsService,
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
      relations: ['users_roles', 'users_roles.rol', 'theme', 'language'],
    });
    if (user.picture) {
      user.picture = await this.awsService.getFile(
        user.picture,
        durationFilesUrl.img_user,
      );
    }
    return user;
  }

  async findRoles(id: number) {
    return this.usersRolesService.findForUser(id);
  }

  async create(createDto: CreateUsersDto) {
    const configTenancy = await this.tenancyConfigService.findOne(
      this.tenancy.id,
    );
    const data: any = Object.assign({}, createDto);
    data.password = this.cryptoService.hashPassword(data.password);
    delete data.users_roles;
    delete data.rol_default;
    delete data.users_organizations;
    delete data.users_competences;
    delete data.users_position_goals;
    if (createDto.theme_id) {
      data.theme_id = configTenancy.theme_id;
    }
    const dataNew = await this.repository.save(data);
    if (createDto.users_roles) {
      await this.usersRolesService.set(
        dataNew.id,
        createDto.users_roles,
        createDto.rol_default,
      );
    }
    if (createDto.users_organizations) {
      await this.usersOrganizationsService.set(
        dataNew.id,
        createDto.users_organizations,
      );
    }
    if (createDto.users_competences) {
      await this.usersCompetencesService.set(
        dataNew.id,
        createDto.users_competences,
      );
    }
    if (createDto.users_position_goals) {
      await this.usersPositionGoalsService.set(
        dataNew.id,
        createDto.users_position_goals,
      );
    }
    return dataNew;
  }

  async update(id: number, updateDto: UpdateUsersDto): Promise<UpdateResult> {
    const data: any = Object.assign({}, updateDto);
    delete data.users_roles;
    delete data.rol_default;
    delete data.users_organizations;
    delete data.users_competences;
    delete data.users_position_goals;
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
    if (updateDto.users_organizations) {
      await this.usersOrganizationsService.set(
        id,
        updateDto.users_organizations,
      );
    }
    if (updateDto.users_competences) {
      await this.usersCompetencesService.set(id, updateDto.users_competences);
    }
    if (updateDto.users_position_goals) {
      await this.usersPositionGoalsService.set(
        id,
        updateDto.users_position_goals,
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
    const user = await this.repository.findOne({ where: loginDto });
    if (user) {
      await this.repository.update(user.id, { last_login: getActualDate() });
    }
    return user;
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
    const bar_power = await this.getPowerBar(this.infoUser.id);
    return {
      ...data,
      bar_power,
      rol_default: rolDefault.rol,
      rol_default_id: rolDefault.rol.id,
    };
  }

  async searchByRol(idRol: number, text: string): Promise<any> {
    const result = await this.repository
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
    await result.map((item) => {
      item['fullname'] = item.name + ' ' + item.lastname;
    });
    return result;
  }

  async getPowerBar(user_id: number) {
    const configTenancy = await this.tenancyConfigService.findOne(
      this.tenancy.id,
    );
    let bar_power = 0;
    const days = Number(configTenancy.bar_span_days);
    const points_expected = Number(configTenancy.bar_expected_points);
    const z = 100;
    const points = await this.pointsUserLogService.pointsUserTotalRangeDates(
      user_id,
      days,
    );
    bar_power = (points * z) / points_expected;
    bar_power = bar_power ? Math.round(bar_power) : 0;
    bar_power = bar_power > 100 ? 100 : bar_power < 0 ? 0 : bar_power;
    return bar_power;
  }
}
