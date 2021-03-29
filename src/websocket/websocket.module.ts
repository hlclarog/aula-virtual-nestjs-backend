import { Module } from '@nestjs/common';
import { MongoManagerModule } from './../database/mongo-manager.module';
import { GatewayService } from './../utils/services/gateway.service';
import { ChannelsModule } from './channels/channels.module';
import { ClientsModule } from './clients/clients.module';
import { WebsocketController } from './websocket.controller';
import { PublicGateway } from './getways/public.gateway';
import { PrivateGateway } from './getways/private.gateway';
import { TokenService } from './../utils/services/token.service';
import { CryptoService } from './../utils/services/crypto.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from './../config/config.module';

@Module({
  imports: [
    JwtModule.register({}),
    MongoManagerModule.forRoot(),
    ChannelsModule,
    ClientsModule,
    ConfigModule,
  ],
  controllers: [WebsocketController],
  providers: [
    PublicGateway,
    PrivateGateway,
    GatewayService,
    TokenService,
    CryptoService,
  ],
  exports: [PublicGateway, PrivateGateway, GatewayService],
})
export class WebsocketModule {}
