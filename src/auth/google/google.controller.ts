import { Controller, Get, Next, Param, Req, Res } from '@nestjs/common';
import { GoogleService } from './google.service';
import { authenticate } from 'passport';

@Controller('auth/google/')
export class GoogleController {
  constructor(private googleService: GoogleService) {}

  @Get(':subDomain')
  async googleAuth(
    @Req() req,
    @Res() res,
    @Next() next,
    @Param('subDomain') subDomain: string,
  ) {
    const strategy = await this.googleService.createStrategy(subDomain);
    authenticate(strategy, {})(req, res, next);
  }

  @Get(':subDomain/callback')
  async googleRedirect(
    @Req() req,
    @Res() res,
    @Next() next,
    @Param('subDomain') subDomain: string,
  ) {
    const strategy = await this.googleService.createStrategy(subDomain);
    authenticate(strategy, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect('/');
      }
      req.logIn(user, async (err) => {
        if (err) {
          return next(err);
        }
        const auth: any = await this.googleService.googleLogin(
          user,
          user.frontEndUrl,
        );
        let url: string;
        if (user.frontEndUrl == 'localhost') {
          url = `${user.frontEndUrl}:4200`;
        } else {
          url = `${user.frontEndUrl}`;
        }
        res.redirect(`http://${url}/#/auth/login/${auth.token}`);
        // return res.send(user);
      });
    })(req, res, next);
  }
}
