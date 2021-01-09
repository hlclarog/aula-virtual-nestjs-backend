import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { ConfigService } from './../config/config.service';
import { GatewayService } from './../utils/services/gateway.service';

@Controller('websocket')
export class WebsocketController {
  constructor(
    private gatewayService: GatewayService,
    private configService: ConfigService,
  ) {}

  @Get('/test-socket')
  @Render('test-socket')
  getTestSocket() {
    return {
      host: `${this.configService.urlBackend()}:${this.configService.portSocket()}`,
    };
  }

  @Post('emit-event')
  public async emitEvent(@Body() payload: any) {
    await this.gatewayService.sendEvent(payload.event, payload.data);
  }
}
