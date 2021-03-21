import { Controller, Get, Next, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleService } from './google.service';
import { authenticate } from 'passport';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth/google')
export class GoogleController {
  constructor(private googleService: GoogleService) {}

  // @Get('google')
  // async googleAuth(@Req() req, @Res() res, @Next() next) {
  //   const strategy = await this.googleService.createStrategy();
  //   authenticate(strategy)(req, res, next);
  // }

  // @Get('google/callback')
  // async googleLoginCallback(@Req() req, @Res() res) {
  //   // handles the Google OAuth2 callback
  //   // const jwt: string = req.user.jwt;
  //   console.log(req.user);
  //   // if (jwt) res.redirect('http://localhost:4200/login/succes/' + jwt);
  //   // else res.redirect('http://localhost:4200/login/failure');
  //   // const auth: any = await this.googleService.googleLogin(req);
  //   res.redirect(`http://localhost:4200/auth/login/info`);
  // }

  // @Get()
  // @UseGuards(AuthGuard('google'))
  // async googleAuth() {}

  // @Get('redirect')
  // @UseGuards(AuthGuard('google'))
  // @ApiResponse({
  //   status: HttpStatus.FOUND,
  //   description: 'Redirection to the front-end',
  // })
  // async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
  //   const auth: any = await this.googleService.googleLogin(req);
  //   res.redirect(
  //     `http://${this.configService.urlApp()}/auth/login/${auth.token}`,
  //   );
  // }

  @Get()
  async googleAuth(@Req() req, @Res() res, @Next() next) {
    const strategy = await this.googleService.createStrategy();
    authenticate(strategy)(req, res, next);
  }

  @Get('/cua/callback')
  async googleRedirect(@Req() req, @Res() res, @Next() next) {
    const strategy = await this.googleService.createStrategy();
    authenticate(strategy, { session: false })(req, res, next);
  }
}
