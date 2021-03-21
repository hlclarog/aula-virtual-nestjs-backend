import { Inject, Injectable } from '@nestjs/common';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '../../config/config.service';
import {
  INFO_TENANCY_PROVIDER,
  InfoTenancyDomain,
} from '../../utils/providers/info-tenancy.module';

@Injectable()
export class GoogleService {
  @Inject(INFO_TENANCY_PROVIDER) tenancyInfo: InfoTenancyDomain;

  constructor(private configService: ConfigService) {}

  createStrategy() {
    console.log(this.tenancyInfo);
    const strategy = new Strategy(
      {
        clientID:
          '456867738303-dcqdufhmeruhusknavesu0ps6f3uurn1.apps.googleusercontent.com',
        clientSecret: 'Y0UEFrkVQCc5FFa33BiCvJaG',
        callbackURL: 'http://localhost:3000/auth/google/cua/callback',
        scope: ['email', 'profile'],
      },
      (
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
      ) => {
        console.log('30', profile);
        const { name, emails, photos } = profile;
        const user = {
          email: emails[0].value,
          name: `${name.givenName} ${name.familyName}`,
          picture: photos[0].value,
          accessToken,
          origin: 'google',
        };
        console.log(profile);
        done(null, user);
      },
    );
    return strategy;
  }
}