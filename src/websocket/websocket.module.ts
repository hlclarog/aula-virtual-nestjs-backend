import { Module } from '@nestjs/common';
import { WebsocketController } from './websocket.controller';
import { WebSocketAppGateway } from './websocket.gateway';

@Module({
  controllers: [WebsocketController],
  providers: [WebSocketAppGateway],
})
export class WebsocketModule {}
