import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth/google')
export class GoogleController {
  constructor() {}

  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth() {}

  @Get(':tenancy/callback')
  @UseGuards(AuthGuard('google'))
  async googleRedirect(@Req() req: Request) {
    return { data: req.user };
  }
}
