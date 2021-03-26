import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth/linkedin')
export class LinkedinController {
  constructor() {}

  @Get()
  @UseGuards(AuthGuard('linkedin'))
  async linkedinAuth() {}

  @Get(':tenancy/callback')
  @UseGuards(AuthGuard('linkedin'))
  async linkedinRedirect(@Req() req: Request) {
    return { data: req.user };
  }
}
