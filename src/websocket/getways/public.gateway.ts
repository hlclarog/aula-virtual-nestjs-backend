import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';
import { Request } from 'express';
import { Client, Server, Socket } from 'socket.io';
import { getHostFromOrigin } from '../../utils/helper';
import { ControlleSocket } from '../../utils/decorators/socket.decorator';
import { ChannelsService } from '../channels/channels.service';
import { ClientsService } from '../clients/clients.service';
import { EVENTS_SOCKET } from '../websocket.dto';

@ControlleSocket('/public')
export class PublicGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    private channelsService: ChannelsService,
    private clientsService: ClientsService,
  ) {}

  async afterInit() {
    await this.clientsService.removeAll();
    await this.channelsService.removeAll();
  }

  sendEvent(event: string, data: any, clients: string[] | string) {
    if (clients) {
      if (Array.isArray(clients)) {
        clients.forEach((client) => {
          this.server.to(client).emit(event, data);
        });
      } else {
        this.server.to(clients).emit(event, data);
      }
    } else {
      this.server.emit(event, data);
    }
  }

  async handleConnection(client: Socket) {
    const request: Request = client.client.request;
    const host = getHostFromOrigin(request.headers.origin);
    await this.clientsService.create(client.id, host);
    await client.emit(EVENTS_SOCKET.SUBSCRIBE, client.client.id);
  }
  async handleDisconnect(client: Client) {
    await this.clientsService.remove(client.id);
  }
}
