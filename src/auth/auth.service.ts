import {
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  InfoTenancyDomain,
  INFO_TENANCY_PROVIDER,
} from '../utils/providers/info-tenancy.module';
import { UsersService } from '../api/acl/users/users.service';
import { ConfigService } from '../config/config.service';
import { TokenService } from '../utils/services/token.service';
import {
  LoginDto,
  MESSAGE_FORBIDDEN,
  DEFAULT_TIME_TOKEN_AUTH,
  RequestPasswordEmailDto,
  DEFAULT_TIME_TOKEN_REQUEST_PASS_EMAIL,
  ChangePasswordEmailDto,
  RegisterDto,
} from './auth.dto';
import { CreateUsersDto } from '../api/acl/users/users.dto';
import { TenancyConfigService } from '../api/tenancy_config/tenancy_config.service';
import { TypesReasonsPoints } from '../api/points_user_log/points_user_log.dto';
import { PointsUserLogService } from '../api/points_user_log/points_user_log.service';
import { TenancyDomains } from '../api/tenancy_domains/tenancy_domains.entity';
import { Tenancies } from '../api/tenancies/tenancies.entity';
import { Connection, createConnection, getConnectionManager } from 'typeorm';
import { DATABASE_MANAGER_PROVIDER } from '../database/database.dto';
import { Users } from '../api/acl/users/users.entity';
import { THEME_DEFAULT_ID } from '../api/themes/themes.dto';
import { UsersRoles } from '../api/acl/users_roles/users_roles.entity';

@Injectable()
export class AuthService {
  @Inject(INFO_TENANCY_PROVIDER) tenancy: InfoTenancyDomain;
  @Inject(DATABASE_MANAGER_PROVIDER) connection: Connection;
  constructor(
    private tokenService: TokenService,
    private usersService: UsersService,
    private configService: ConfigService,
    private tenancyConfigService: TenancyConfigService,
    private pointsUserLogService: PointsUserLogService,
  ) {}
  async login(data: LoginDto) {
    const user = await this.usersService.verifyUser(data);
    if (user) {
      const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
      };
      const token = await this.tokenService
        .createTokenKey(payload, DEFAULT_TIME_TOKEN_AUTH, this.tenancy.secret)
        .then((res) => res);
      await this.pointsUserLogService.generatePoints(
        user.id,
        TypesReasonsPoints.LOGIN,
      );
      return { payload, token };
    } else {
      throw new ForbiddenException({
        message: MESSAGE_FORBIDDEN,
      });
    }
  }
  async logout(user_id: number) {
    await this.pointsUserLogService.generatePoints(
      user_id,
      TypesReasonsPoints.LOGOUT,
    );
    return { logout: true };
  }
  async register(data: RegisterDto) {
    const config = await this.tenancyConfigService.findOne(this.tenancy.id);
    const user: CreateUsersDto = {
      name: data.name,
      email: data.email,
      password: data.password,
      users_roles: config.rol_default_id ? [config.rol_default_id] : [],
      rol_default: config.rol_default_id,
      theme_id: config.theme_id,
    };
    if (config.allow_registration) {
      const newUser = await this.usersService.create(user);
      return {
        registered: true,
        data: newUser,
      };
    } else {
      throw new InternalServerErrorException({
        message:
          'ESTA ENTIDAD NO SE ENCUENTRA HABILITADA PARA REGISTRO DE USUARIOS',
      });
    }
    return {
      registered: false,
    };
  }

  async verify(tokenaccept) {
    return await this.tokenService
      .verifyTokenKey(tokenaccept, this.tenancy.secret)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new ForbiddenException(err);
      });
  }

  async infoTenancy(id) {
    const config = await this.tenancyConfigService.findOne(id);
    return {
      data: {
        config,
      },
    };
  }

  async requestForgotPassword(data: RequestPasswordEmailDto) {
    const dataUser = await this.usersService.findByEmail(data.email);
    if (dataUser) {
      const token = await this.tokenService
        .createTokenKey(
          dataUser,
          DEFAULT_TIME_TOKEN_REQUEST_PASS_EMAIL,
          this.configService.hashTokenSecretPasswordReq(),
        )
        .then((res) => res);
      return { sendRequest: true, token, email: data.email };
    } else {
      return { sendRequest: false };
    }
  }

  async changePassword(data: ChangePasswordEmailDto) {
    return await this.tokenService
      .verifyTokenKey(
        data.access_token,
        this.configService.hashTokenSecretPasswordReq(),
      )
      .then(async (tokenAuth) => {
        if (tokenAuth.data) {
          await this.usersService.changePassword({
            id: tokenAuth.data.id,
            password: data.password,
          });
          return { updated: true };
        }
      })
      .catch((err) => {
        throw new ForbiddenException(err);
      });
  }
}
