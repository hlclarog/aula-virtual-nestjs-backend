import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';
import { Client, Server, Socket } from 'socket.io';
import { ControlleSocket } from '../../utils/decorators/socket.decorator';
import { ClientsService } from '../clients/clients.service';
import { EmitchangeGamificationUser, EVENTS_SOCKET } from '../websocket.dto';

@ControlleSocket('/private')
export class PrivateGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(private clientsService: ClientsService) {}

  afterInit(server: any) {}

  sendEvent(event: string, data: any) {
    this.server.emit(event, data);
  }

  async sendChangeGamification(data: EmitchangeGamificationUser) {
    const user = await this.clientsService.findUser(data.user_id.toString());
    if (user) {
      console.log(data, user);
      this.server
        .to(user.socket)
        .emit(EVENTS_SOCKET.CHANGE_GAMIFICATION_USER, data.info);
    }
  }

  async handleConnection(client: Socket) {
    await client.emit(EVENTS_SOCKET.SUBSCRIBE, client.client.id);
  }
  async handleDisconnect(client: Client) {
    await this.clientsService.remove(client.id);
  }
}
