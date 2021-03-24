import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-linkedin-oauth2';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LinkedinStrategy extends PassportStrategy(Strategy, 'linkedin') {
  constructor() {
    super({
      clientID: '78t7pay7blplb0',
      clientSecret: 'vX38XOQaQnt2EBCB',
      callbackURL: 'http://localhost:3000/auth/linkedin/cua/callback',
      scope: ['r_basicprofile', 'r_emailaddress'],
      profileFields: [
        'id',
        'first-name',
        'last-name',
        'email-address',
        'headline',
      ],
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
      origin: 'linkedin',
    };
    process.nextTick(function () {
      // To keep the example simple, the user's LinkedIn profile is returned to
      // represent the logged-in user. In a typical application, you would want
      // to associate the LinkedIn account with a user record in your database,
      // and return that user instead.
      return done(null, user);
    });
  }
}
