import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from './../config/config.service';

@Injectable()
export class TokenService {
  TOKEN_SECRET: string;
  constructor(private config: ConfigService, private jwtService: JwtService) {
    this.TOKEN_SECRET = this.config.hashTokenSecret();
  }

  public async createToken(dataToken, time): Promise<string> {
    return new Promise(async (resolve) => {
      const token = this.jwtService.sign(
        {
          data: dataToken,
        },
        {
          expiresIn: time,
          privateKey: this.TOKEN_SECRET,
        },
      );
      resolve(token);
    });
  }

  public async verifyToken(dataToken): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const tokenDecoded = this.jwtService.verify(dataToken, {
          secret: this.TOKEN_SECRET,
        });
        resolve(tokenDecoded);
      } catch (err) {
        reject(err);
      }
    });
  }

  public async createTokenKey(dataToken, time, key): Promise<string> {
    return new Promise(async (resolve) => {
      const token = this.jwtService.sign(dataToken, {
        privateKey: key,
        expiresIn: time,
      });
      resolve(token);
    });
  }

  public async verifyTokenKey(dataToken, key): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const tokenDecoded = this.jwtService.verify(dataToken, key);
        resolve(tokenDecoded);
      } catch (err) {
        reject(err);
      }
    });
  }
}
