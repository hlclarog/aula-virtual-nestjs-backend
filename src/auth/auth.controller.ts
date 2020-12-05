import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('auth')
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
}
