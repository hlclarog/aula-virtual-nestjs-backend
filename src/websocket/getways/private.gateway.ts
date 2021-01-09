import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';
import { Client, Server, Socket } from 'socket.io';
import { ControlleSocket } from '../../utils/decorators/socket.decorator';
import { EVENTS_SOCKET } from '../websocket.dto';

@ControlleSocket('/private')
export class PrivateGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor() {}

  afterInit(server: any) {}

  sendEvent(event: string, data: any) {
    this.server.emit(event, data);
  }

  async handleConnection(client: Socket) {
    await client.emit(EVENTS_SOCKET.SUBSCRIBE, client.client.id);
  }
  async handleDisconnect(client: Client) {}
}
