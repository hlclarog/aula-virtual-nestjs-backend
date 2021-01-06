import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import {
  InfoTenancyDomain,
  INFO_TENANCY_PROVIDER,
} from './../utils/providers/info-tenancy.module';
import { UsersService } from './../api/acl/users/users.service';
import { ConfigService } from './../config/config.service';
import { TokenService } from './../utils/services/token.service';
import {
  LoginDto,
  MESSAGE_FORBIDDEN,
  DEFAULT_TIME_TOKEN_AUTH,
  RequestPasswordEmailDto,
  DEFAULT_TIME_TOKEN_REQUEST_PASS_EMAIL,
  ChangePasswordEmailDto,
} from './auth.dto';

@Injectable()
export class AuthService {
  @Inject(INFO_TENANCY_PROVIDER) dataDomain: InfoTenancyDomain;
  constructor(
    private tokenService: TokenService,
    private usersService: UsersService,
    private configService: ConfigService,
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
        .createTokenKey(
          payload,
          DEFAULT_TIME_TOKEN_AUTH,
          this.dataDomain.secret,
        )
        .then((res) => res);
      return { payload, token };
    } else {
      throw new ForbiddenException({
        message: MESSAGE_FORBIDDEN,
      });
    }
  }

  async verify(tokenaccept) {
    return await this.tokenService
      .verifyTokenKey(tokenaccept, this.dataDomain.secret)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new ForbiddenException(err);
      });
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
