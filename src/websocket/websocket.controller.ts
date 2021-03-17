import { Body, Controller, Get, Post, Render, Req } from '@nestjs/common';
import { Request } from 'express';
import { getHostFromOrigin } from './../utils/helper';
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

  @Post('connected-private')
  public async connectPrivate(@Body() payload: any, @Req() request: Request) {
    const host = getHostFromOrigin(request.headers);
    await this.gatewayService.connectPrivate(
      host,
      payload.user_id,
      payload.socket,
    );
  }
}
