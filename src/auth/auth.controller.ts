import { Body, Get, Inject, Param, Post } from '@nestjs/common';
import {
  INFO_TENANCY_PROVIDER,
  InfoTenancyDomain,
} from 'src/utils/providers/info-tenancy.module';
import { ControllerAuth } from './../utils/decorators/controllers.decorator';
import {
  ChangePasswordEmailDto,
  LoginDto,
  RegisterDto,
  RequestPasswordEmailDto,
} from './auth.dto';
import { AuthService } from './auth.service';

@ControllerAuth({ name: '' })
export class AuthController {
  constructor(
    @Inject(INFO_TENANCY_PROVIDER) private tenancy: InfoTenancyDomain,
    private authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() data: LoginDto) {
    const result = await this.authService.login(data);
    return result;
  }

  @Post('register')
  async register(@Body() data: RegisterDto) {
    const result = await this.authService.register(data);
    return result;
  }

  @Get('tenancy_info')
  async tenancyInfo() {
    const result = await this.authService.infoTenancy(this.tenancy.id);
    return result;
  }

  @Get('verify/:token')
  async verify(@Param('token') token: string) {
    const result = await this.authService.verify(token);
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
