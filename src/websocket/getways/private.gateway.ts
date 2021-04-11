import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { Client, Server, Socket } from 'socket.io';
import { NAME_HEADER_AUTH } from './../../auth/auth.dto';
import { getHostFromOrigin } from './../../utils/helper';
import { ControlleSocket } from '../../utils/decorators/socket.decorator';
import { ClientsService } from '../clients/clients.service';
import {
  EmitchangeGamificationUser,
  EmitNewCommentLesson,
  EVENTS_SOCKET,
} from '../websocket.dto';
import { TokenService } from './../../utils/services/token.service';
import { CryptoService } from './../../utils/services/crypto.service';
import { ConfigService } from './../../config/config.service';
import { Inject } from '@nestjs/common';
import { DATABASE_MANAGER_PROVIDER } from './../../database/database.dto';
import { Connection } from 'typeorm';
import { TENANCY_DOMAINS_ENTITY } from './../../api/tenancy_domains/tenancy_domains.dto';

@ControlleSocket('/private')
export class PrivateGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  @Inject(DATABASE_MANAGER_PROVIDER) connectionPublic: Connection;

  constructor(
    private clientsService: ClientsService,
    private tokenService: TokenService,
    private cryptoService: CryptoService,
    private configService: ConfigService,
  ) {}

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
      .to(`${EVENTS_SOCKET.NEW_COMMENT_LESSON}_${data.course_lesson_id}`)
      .emit(EVENTS_SOCKET.NEW_COMMENT_LESSON, data);
  }

  @SubscribeMessage('suscribeme_to_comments_lesson')
  handleEvent(client: Socket, course_lesson_id: number) {
    client.join(`${EVENTS_SOCKET.NEW_COMMENT_LESSON}_${course_lesson_id}`);
    return course_lesson_id;
  }

  async handleConnection(client: Socket) {
    const host = getHostFromOrigin(client.handshake.headers);
    const domain: any = await this.connectionPublic
      .getRepository(TENANCY_DOMAINS_ENTITY)
      .findOneOrFail({
        relations: ['tenancy'],
        where: { description: host },
      });
    const payload = `${domain.tenancy.schema}.${host}`;
    const secret = await this.cryptoService.hashSecret(
      payload,
      this.configService.hashTokenSecret(),
    );
    const token = await this.tokenService.verifyTokenKey(
      client.handshake.query[NAME_HEADER_AUTH],
      secret,
    );
    client.join(client.client.id);
    await this.clientsService.create(client.client.id, host, token.data.id);
    await client.emit(EVENTS_SOCKET.SUBSCRIBE, client.client.id);
  }
  async handleDisconnect(client: Client) {
    await this.clientsService.remove(client.id.split('#')[1]);
  }
}
