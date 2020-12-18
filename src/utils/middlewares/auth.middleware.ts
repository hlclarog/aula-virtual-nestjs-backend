import {
  Injectable,
  NestMiddleware,
  HttpStatus,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, validate } from 'class-validator';
import { TokenService } from './../services/token.service';
import { ConfigService } from './../../config/config.service';

export class HeadersTokenDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  authorization: string;
}

@Injectable()
export class AuthVerifyTokenMiddleware implements NestMiddleware {
  constructor(
    private tokenService: TokenService,
    private configService: ConfigService,
  ) {}

  use(req: Request, res: Response, next) {
    const headers: any = req.headers;
    const headerData: HeadersTokenDto = new HeadersTokenDto();
    headerData.authorization = headers.authorization;
    const dev = this.configService.isDevelopment();
    if (!dev) {
      validate(headerData).then(async (errors) => {
        if (errors.length > 0) {
          res.status(HttpStatus.FORBIDDEN).json(new ForbiddenException(errors));
        } else {
          await this.tokenService
            .verifyToken(headers.authorization.split(' ')[1])
            .then(() => {
              next();
            })
            .catch((err) => {
              res
                .status(HttpStatus.UNAUTHORIZED)
                .json(new UnauthorizedException(err));
            });
        }
      });
    } else {
      next();
    }
  }
}
