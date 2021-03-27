import { Controller, Get, Next, Param, Req, Res } from '@nestjs/common';
import { GoogleService } from './google.service';
import { authenticate } from 'passport';

@Controller('auth/google/')
export class GoogleController {
  constructor(private googleService: GoogleService) {}

  @Get(':hostname')
  async googleAuth(
    @Req() req,
    @Res() res,
    @Next() next,
    @Param('hostname') hostname: string,
  ) {
    const strategy = await this.googleService.createStrategy(hostname);
    authenticate(strategy, {})(req, res, next);
  }

  @Get(':hostname/callback')
  async googleRedirect(
    @Req() req,
    @Res() res,
    @Next() next,
    @Param('hostname') hostname: string,
  ) {
    const strategy = await this.googleService.createStrategy(hostname);
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
        const auth: any = await this.googleService.googleLogin(user, hostname);
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
