import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Client, Server, Socket } from 'socket.io';

@WebSocketGateway(81, { namespace: '' })
export class WebSocketAppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  afterInit() {
    console.log('Init server');
  }
  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected client ${client.client.id}`);
    client.emit('subcribe', client.client.id);
    console.log(args);
  }
  handleDisconnect(client: Client) {
    console.log(`Disconnected client ${client.id}`);
  }
}
