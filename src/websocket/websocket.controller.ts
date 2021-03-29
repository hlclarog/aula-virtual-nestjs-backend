import { Controller, Get, Render } from '@nestjs/common';
import { ConfigService } from './../config/config.service';

@Controller('websocket')
export class WebsocketController {
  constructor(private configService: ConfigService) {}

  @Get('/test-socket')
  @Render('test-socket')
  getTestSocket() {
    return {
      host: `${this.configService.urlBackend()}:${this.configService.portSocket()}`,
    };
  }
}
