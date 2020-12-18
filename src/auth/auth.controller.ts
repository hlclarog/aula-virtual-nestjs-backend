import { Body, Get, Headers, Post } from '@nestjs/common';
import { ControllerAuth } from './../utils/decorators/controllers.decorator';
import {
  ChangePasswordEmailDto,
  LoginDto,
  RequestPasswordEmailDto,
} from './auth.dto';
import { AuthService } from './auth.service';

@ControllerAuth({ name: '' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() data: LoginDto) {
    const result = await this.authService.login(data);
    return result;
  }

  @Get('verify')
  async verify(@Headers() headers) {
    const result = await this.authService.verify(headers['tokenaccept']);
    return result;
  }

  @Post('forgot_request')
  async forgotRequest(@Body() data: RequestPasswordEmailDto) {
    const result = await this.authService.requestForgotPassword(data);
    return result;
  }

  @Post('password_reset')
  async passwordReset(@Body() data: ChangePasswordEmailDto) {
    const result = await this.authService.changePassword(data);
    return result;
  }
}
