import { Inject, Injectable } from '@nestjs/common';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '../../config/config.service';
import {
  INFO_TENANCY_PROVIDER,
  InfoTenancyDomain,
} from '../../utils/providers/info-tenancy.module';
import * as passport from 'passport';

@Injectable()
export class GoogleService {
  @Inject(INFO_TENANCY_PROVIDER) tenancyInfo: InfoTenancyDomain;

  constructor(private configService: ConfigService) {}

  createStrategy() {
    const tenancyOauth2Credential = this.tenancyInfo.tenancyOauth2Credentials.find(
      (f) => f.type === 'google',
    );
    const strategy = new Strategy(
      {
        clientID: tenancyOauth2Credential.client_id,
        clientSecret: tenancyOauth2Credential.client_secret,
        callbackURL: tenancyOauth2Credential.callback_url,
        scope: ['email', 'profile'],
      },
      (
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
      ) => {
        const { name, emails, photos } = profile;
        const user = {
          email: emails[0].value,
          name: `${name.givenName} ${name.familyName}`,
          picture: photos[0].value,
          accessToken,
          origin: 'google',
        };



        passport.serializeUser((user, done) => {
          done(null, user);
        });

        passport.deserializeUser((user, done) => {
          done(null, user);
        });

        done(null, user);
      },
    );
    return strategy;
  }
}
