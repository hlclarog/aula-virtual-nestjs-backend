import { Module } from '@nestjs/common';
import { MongoManagerModule } from './../database/mongo-manager.module';
import { GatewayService } from './../utils/services/gateway.service';
import { ChannelsModule } from './channels/channels.module';
import { ClientsModule } from './clients/clients.module';
import { WebsocketController } from './websocket.controller';
import { PublicGateway } from './getways/public.gateway';
import { PrivateGateway } from './getways/private.gateway';

@Module({
  imports: [MongoManagerModule.forRoot(), ChannelsModule, ClientsModule],
  controllers: [WebsocketController],
  providers: [PublicGateway, PrivateGateway, GatewayService],
  exports: [PublicGateway, PrivateGateway, GatewayService],
})
export class WebsocketModule {}
