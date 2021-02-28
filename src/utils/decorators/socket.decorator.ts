import { applyDecorators } from '@nestjs/common';
import { WebSocketGateway } from '@nestjs/websockets';
import { ConfigServiceI } from './../../config/config.class';

export function ControlleSocket(namespace) {
  const cll = ConfigServiceI();
  return applyDecorators(WebSocketGateway(cll.portSocket(), { namespace }));
}
