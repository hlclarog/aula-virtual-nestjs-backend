import { createConnection } from 'typeorm';
import { MONGO_MANAGER_PROVIDER } from './database.dto';
import { ConfigService } from '../config/config.service';

export const mongoManagerProviders = [
  {
    provide: MONGO_MANAGER_PROVIDER,
    inject: [ConfigService],
    useFactory: async (config: ConfigService) =>
      await createConnection({
        type: 'mongodb',
        host: config.hostMongo(),
        database: config.dbMongo(),
        port: config.portMongo(),
        entities: [__dirname + '/../websocket/**/*.entity{.ts,.js}'],
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
  },
];
