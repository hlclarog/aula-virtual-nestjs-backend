import { Scope } from '@nestjs/common';
import { ConfigService } from './../config/config.service';
import { QUEUES_PROVIDER } from './queues.dto';

export const queuesProvider = {
  provide: QUEUES_PROVIDER,
  scope: Scope.REQUEST,
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => ({
    redis: {
      host: config.get('QUEUE_HOST'),
      port: +config.get('QUEUE_PORT'),
    },
  }),
};
