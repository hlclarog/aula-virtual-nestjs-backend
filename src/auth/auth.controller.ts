import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ChangePasswordEmailDto,
  LoginDto,
  RequestPasswordEmailDto,
} from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
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
