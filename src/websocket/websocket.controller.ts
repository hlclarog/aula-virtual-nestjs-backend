import { Body, Controller, Get, Post, Render } from '@nestjs/common';
import { GatewayService } from './../utils/services/gateway.service';

@Controller('websocket')
export class WebsocketController {
  constructor(private gatewayService: GatewayService) {}

  @Get('/test-socket')
  @Render('test-socket')
  getTestSocket() {}

  @Post('emit-event')
  public async emitEvent(@Body() payload: any) {
    await this.gatewayService.sendEvent(payload.event, payload.data);
    return {};
  }
}
