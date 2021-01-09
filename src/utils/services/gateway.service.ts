import { Inject, Injectable } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Channels } from './../../websocket/channels/channels.entity';
import { INFO_CHANNEL_PROVIDER } from '../providers/info-channel.module';
import { ControlleSocket } from '../decorators/socket.decorator';
import { PublicGateway } from '../../websocket/getways/public.gateway';
import { PrivateGateway } from '../../websocket/getways/private.gateway';

@Injectable()
@ControlleSocket('')
export class GatewayService {
  @WebSocketServer() server: Server;
  @Inject(INFO_CHANNEL_PROVIDER) private channel: Channels;

  constructor(
    private publicGateway: PublicGateway,
    private privateGateway: PrivateGateway,
  ) {}

  sendEvent(event: string, data: any) {
    const clients = Object.assign([], this.channel.clients);
    this.publicGateway.sendEvent(event, data, clients);
  }

  sendEventPrivate(event: string, data: any) {
    this.privateGateway.sendEvent(event, data);
  }
}
