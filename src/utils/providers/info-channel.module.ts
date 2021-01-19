import { Scope, DynamicModule, Global, Module } from '@nestjs/common';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { ChannelsModule } from '../../websocket/channels/channels.module';
import { MongoManagerModule } from '../../database/mongo-manager.module';
import { ChannelsService } from './../../websocket/channels/channels.service';
import { ClientsModule } from './../../websocket/clients/clients.module';
import { getHostFromOrigin } from '../helper';

export const INFO_CHANNEL_PROVIDER = 'INFO_CHANNEL_PROVIDER';

@Global()
@Module({})
export class InfoChannelModule {
  static forRoot(): DynamicModule {
    const infoChannelProvider = {
      provide: INFO_CHANNEL_PROVIDER,
      scope: Scope.REQUEST,
      inject: [REQUEST, ChannelsService],
      useFactory: async (req: Request, channelService: ChannelsService) => {
        const host = getHostFromOrigin(req.headers);
        const channel = await channelService.find(host);
        return channel;
      },
    };
    return {
      module: InfoChannelModule,
      imports: [MongoManagerModule, ChannelsModule, ClientsModule],
      providers: [infoChannelProvider],
      exports: [infoChannelProvider],
    };
  }
}

// @Inject(INFO_CHANNEL_PROVIDER) private channel: Channels;
