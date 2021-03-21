import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from './../../config/config.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private configService: ConfigService) {
    super({
      clientID:
        '456867738303-dcqdufhmeruhusknavesu0ps6f3uurn1.apps.googleusercontent.com',
      clientSecret: 'Y0UEFrkVQCc5FFa33BiCvJaG',
      callbackURL: 'http://localhost:3000/auth/google/cua/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName}`,
      picture: photos[0].value,
      accessToken,
      origin: 'google',
    };
    done(null, user);
  }
}
