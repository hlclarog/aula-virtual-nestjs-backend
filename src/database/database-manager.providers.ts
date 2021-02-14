import { createConnection } from 'typeorm';
import { DATABASE_MANAGER_PROVIDER } from './database.dto';
import { ConfigService } from '../config/config.service';

export const databaseManagerProviders = [
  {
    provide: DATABASE_MANAGER_PROVIDER,
    inject: [ConfigService],
    useFactory: async (config: ConfigService) =>
      await createConnection({
        type: 'postgres',
        host: config.hostDatabase(),
        port: config.portDatabase(),
        username: config.userDatabase(),
        password: config.passDatabase(),
        database: config.nameDatabase(),
        migrationsTableName: 'migrations_registers',
        migrations: [__dirname + '/../migrations/manager/*{.ts,.js}'],
        cli: { migrationsDir: __dirname + '/../migrations/manager' },
        entities: [
          __dirname + '/../api/**/*.entity{.ts,.js}',
          __dirname + '/../../node_modules/@switchit/**/*.entity.js',
        ],
        synchronize: false,
      }),
  },
];
