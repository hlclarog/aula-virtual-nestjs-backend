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
        migrations: [__dirname + '/../migrations/files/*{.ts,.js}'],
        cli: { migrationsDir: __dirname + '/../migrations/files' },
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
  },
];
