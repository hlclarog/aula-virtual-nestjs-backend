import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth/facebook')
export class FacebookController {
  constructor() {}

  @Get()
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth() {}

  @Get(':tenancy/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookRedirect(@Req() req: Request) {
    return { data: req.user };
  }
}
