import { Module } from '@nestjs/common';
import { MongoManagerModule } from './../database/mongo-manager.module';
import { GatewayService } from './../utils/services/gateway.service';
import { ChannelsModule } from './channels/channels.module';
import { ClientsModule } from './clients/clients.module';
import { WebsocketController } from './websocket.controller';
import { WebSocketAppGateway } from './websocket.gateway';

@Module({
  imports: [MongoManagerModule.forRoot(), ChannelsModule, ClientsModule],
  controllers: [WebsocketController],
  providers: [WebSocketAppGateway, GatewayService],
  exports: [WebSocketAppGateway, GatewayService],
})
export class WebsocketModule {}
