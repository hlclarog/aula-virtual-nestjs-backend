import { Inject, Injectable } from '@nestjs/common';
import { WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Channels } from './../../websocket/channels/channels.entity';
import { INFO_CHANNEL_PROVIDER } from '../providers/info-channel.module';
import { ControlleSocket } from '../decorators/socket.decorator';
import { PublicGateway } from '../../websocket/getways/public.gateway';
import { PrivateGateway } from '../../websocket/getways/private.gateway';
import { ClientsService } from 'src/websocket/clients/clients.service';
import { EmitchangeGamificationUser } from './../../websocket/websocket.dto';

@Injectable()
@ControlleSocket('')
export class GatewayService {
  @WebSocketServer() server: Server;
  @Inject(INFO_CHANNEL_PROVIDER) private channel: Channels;

  constructor(
    private publicGateway: PublicGateway,
    private privateGateway: PrivateGateway,
    private clientsService: ClientsService,
  ) {}

  sendEvent(event: string, data: any) {
    const clients = Object.assign([], this.channel.clients);
    this.publicGateway.sendEvent(event, data, clients);
  }

  emitChangeGamification(data: EmitchangeGamificationUser) {
    this.privateGateway.sendChangeGamification(data);
  }

  async connectPrivate(host: string, user_id: string, socket: string) {
    await this.clientsService.create(socket, host, user_id);
  }
  sendEventPrivate(event: string, data: any) {
    this.privateGateway.sendEvent(event, data);
  }
}
