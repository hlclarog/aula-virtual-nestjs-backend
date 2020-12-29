import { Controller, Get, Render } from '@nestjs/common';

@Controller('websocket')
export class WebsocketController {
  @Get('/test-socket')
  @Render('test-socket')
  getTestSocket() {}
}
