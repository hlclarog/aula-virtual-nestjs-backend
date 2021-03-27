import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { Client, Server, Socket } from 'socket.io';
import { ControlleSocket } from '../../utils/decorators/socket.decorator';
import { ClientsService } from '../clients/clients.service';
import {
  EmitchangeGamificationUser,
  EmitNewCommentLesson,
  EVENTS_SOCKET,
} from '../websocket.dto';

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
      this.server
        .to(user.socket)
        .emit(EVENTS_SOCKET.CHANGE_GAMIFICATION_USER, data.info);
    }
  }

  async sendCommetLesson(data: EmitNewCommentLesson) {
    await this.server
      .to(`${EVENTS_SOCKET.NEW_COMMENT_LESSON}_${data.lesson_id}`)
      .emit(EVENTS_SOCKET.NEW_COMMENT_LESSON, data);
  }

  @SubscribeMessage('suscribeme_to_comments_lesson')
  handleEvent(client: Socket, lesson_id: number) {
    client.join(`${EVENTS_SOCKET.NEW_COMMENT_LESSON}_${lesson_id}`);
    return lesson_id;
  }

  async handleConnection(client: Socket) {
    client.join(client.client.id);
    await client.emit(EVENTS_SOCKET.SUBSCRIBE, client.client.id);
  }
  async handleDisconnect(client: Client) {
    await this.clientsService.remove(client.id);
  }
}
