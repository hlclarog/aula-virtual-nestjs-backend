import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/api/users/users.service';
import { TokenService } from './../services/token.service';
import {
  LoginDto,
  MESSAGE_FORBIDDEN,
  DEFAULT_TIME_TOKEN_AUTH,
} from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private tokenService: TokenService,
    private usersService: UsersService,
  ) {}
  async login(data: LoginDto) {
    const user = await this.usersService.verifyUser(data);
    console.log(user);
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
}
