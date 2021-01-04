import { Module } from '@nestjs/common';
import { MongoManagerModule } from 'src/database/mongo-manager.module';
import { ChannelsModule } from './channels/channels.module';
import { ClientsModule } from './clients/clients.module';
import { WebsocketController } from './websocket.controller';
import { WebSocketAppGateway } from './websocket.gateway';

@Module({
  imports: [MongoManagerModule.forRoot(), ChannelsModule, ClientsModule],
  controllers: [WebsocketController],
  providers: [WebSocketAppGateway],
})
export class WebsocketModule {}
