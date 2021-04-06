import { Controller, Get, Next, Param, Req, Res } from '@nestjs/common';
import { authenticate } from 'passport';
import { FacebookService } from './facebook.service';

@Controller('auth/facebook')
export class FacebookController {
  // constructor() {}
  //
  // @Get()
  // @UseGuards(AuthGuard('facebook'))
  // async facebookAuth() {}
  //
  // @Get(':tenancy/callback')
  // @UseGuards(AuthGuard('facebook'))
  // async facebookRedirect(@Req() req: Request) {
  //   return { data: req.user };
  // }

  constructor(private facebookService: FacebookService) {}

  @Get(':subDomain')
  async googleAuth(
    @Req() req,
    @Res() res,
    @Next() next,
    @Param('subDomain') subDomain: string,
  ) {
    const strategy = await this.facebookService.createStrategy(subDomain);
    authenticate(strategy, {})(req, res, next);
  }

  @Get(':subDomain/callback')
  async googleRedirect(
    @Req() req,
    @Res() res,
    @Next() next,
    @Param('subDomain') subDomain: string,
  ) {
    const strategy = await this.facebookService.createStrategy(subDomain);
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
        const auth: any = await this.facebookService.googleLogin(
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
