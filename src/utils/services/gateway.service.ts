import { Inject, Injectable } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Channels } from './../../websocket/channels/channels.entity';
import { INFO_CHANNEL_PROVIDER } from '../providers/info-channel.module';
import { ControlleSocket } from '../decorators/socket.decorator';
import { WebSocketAppGateway } from './../../websocket/websocket.gateway';

@Injectable()
@ControlleSocket('')
export class GatewayService {
  @WebSocketServer() server: Server;
  @Inject(INFO_CHANNEL_PROVIDER) private channel: Channels;

  constructor(private webSocketAppGateway: WebSocketAppGateway) {}

  sendEvent(event: string, data: any) {
    const clients = Object.assign([], this.channel.clients);
    this.webSocketAppGateway.sendEvent(event, data, clients);
  }
}
