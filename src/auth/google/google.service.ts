import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import {
  INFO_TENANCY_PROVIDER,
  InfoTenancyDomain,
} from '../../utils/providers/info-tenancy.module';
import { deserializeUser, serializeUser } from 'passport';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleService {
  @Inject(INFO_TENANCY_PROVIDER) tenancyInfo: InfoTenancyDomain;

  constructor(private authService: AuthService) {}

  createStrategy() {
    console.log(this.tenancyInfo);
    const tenancyOauth2Credential = this.tenancyInfo.tenancyOauth2Credentials.find(
      (f) => f.integration_type_id === 1,
    );
    return new Strategy(
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
          frontEndUrl: this.tenancyInfo.domain.description,
        };

        serializeUser((user, done) => {
          done(null, user);
        });

        deserializeUser((user, done) => {
          done(null, user);
        });

        done(null, user);
      },
    );
  }

  async googleLogin(user) {
    if (!user) {
      throw new ForbiddenException({ message: 'No user from google' });
    }
    return await this.authService.loginEmail(user).then((result) => result);
  }
}
