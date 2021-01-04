import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';
import { Request } from 'express';
import { Client, Server, Socket } from 'socket.io';
import { ControlleSocket } from './../utils/decorators/socket.decorator';
import { ChannelsService } from './channels/channels.service';
import { ClientsService } from './clients/clients.service';

@ControlleSocket('')
export class WebSocketAppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    private channelsService: ChannelsService,
    private clientsService: ClientsService,
  ) {}

  async afterInit() {
    await this.channelsService.removeAll();
    await this.clientsService.removeAll();
  }

  async handleConnection(client: Socket) {
    const request: Request = client.client.request;
    await this.clientsService.create(client.id, request.headers.host);
    await client.emit('subcribe', client.client.id);
  }
  async handleDisconnect(client: Client) {
    await this.clientsService.remove(client.id);
  }
}
