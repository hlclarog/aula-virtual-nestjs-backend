import { Controller, Get, Next, Param, Req, Res } from '@nestjs/common';
import { GoogleService } from './google.service';
import { authenticate } from 'passport';

@Controller('auth/google')
export class GoogleController {
  constructor(private googleService: GoogleService) {}

  @Get()
  async googleAuth(@Req() req, @Res() res, @Next() next) {
    const strategy = await this.googleService.createStrategy();
    authenticate(strategy, {})(req, res, next);
  }

  @Get(':tenancy/callback')
  async googleRedirect(
    @Req() req,
    @Res() res,
    @Next() next,
    @Param('tenancy') tenancy: string,
  ) {
    const strategy = await this.googleService.createStrategy();
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
        const auth: any = await this.googleService.googleLogin(user);
        let url = '';
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
