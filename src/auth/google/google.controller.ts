import {
  Controller,
  Get,
  Next,
  Param,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
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
  @UseGuards(AuthGuard('google'))
  async googleRedirect(@Req() req: Request, @Param('tenancy') tenancy: string) {
    console.log(tenancy);
    return { data: req.user };
  }

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

  // @Get()
  // @UseGuards(AuthGuard('google'))
  // async googleAuth() {}
  //
  // @Get(':tenancy/callback')
  // @UseGuards(AuthGuard('google'))
  // async googleRedirect(@Req() req: Request, @Param('tenancy') tenancy: string) {
  //   console.log(tenancy);
  //   return { data: req.user };
  // }

  // @Get(':tenancy/callback')
  // async googleRedirect(@Req() req, @Res() res, @Next() next) {
  //
  //   console.log(req.user);
  //   // console.log(req);
  //   // console.log(res);
  //   const strategy = await this.googleService.createStrategy();
  //   authenticate(strategy, {
  //     failureRedirect: '/login',
  //     successReturnToOrRedirect: 'info',
  //   })(req, res, next);
  // }
  //
  // @Get('cua/info')
  // async info(@Req() req) {
  //   console.log(req.user);
  //   console.log('info');
  // }
}
