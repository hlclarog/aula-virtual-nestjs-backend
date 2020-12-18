import { ForbiddenException, Injectable } from '@nestjs/common';
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
  constructor(
    private tokenService: TokenService,
    private usersService: UsersService,
    private configService: ConfigService,
  ) {}
  async login(data: LoginDto) {
    const user = await this.usersService.verifyUser(data);
    if (user) {
      const payload = { ...data };
      const token = await this.tokenService
        .createToken(payload, DEFAULT_TIME_TOKEN_AUTH)
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
      .verifyToken(tokenaccept)
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
