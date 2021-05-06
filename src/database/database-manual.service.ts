import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from './../config/config.service';
import { createConnection, getConnectionManager } from 'typeorm';
import { NO_FOUND_CLIENT } from './database.dto';

@Injectable()
export class DatabaseManualService {
  constructor(private config: ConfigService) {}

  async getConnection(schema) {
    if (schema) {
      const connectionName = `tenant_${schema}`;
      const connectionManager = await getConnectionManager();
      if (connectionManager.has(connectionName)) {
        const connection = await connectionManager.get(connectionName);
        return Promise.resolve(
          connection.isConnected ? connection : connection.connect(),
        );
      }
      const con = await createConnection({
        type: 'postgres',
        host: this.config.hostDatabase(),
        port: this.config.portDatabase(),
        username: this.config.userDatabase(),
        password: this.config.passDatabase(),
        database: this.config.nameDatabase(),
        migrationsTableName: 'migrations_registers',
        migrations: [__dirname + '/../migrations/tenancy/*{.ts,.js}'],
        entities: [
          __dirname + '/../api/**/*.entity{.ts,.js}',
          __dirname + '/../../node_modules/nestjs-oauth2-server/**/*.entity.js',
        ],
        cli: { migrationsDir: __dirname + '/../migrations/tenancy' },
        synchronize: false,
        name: connectionName,
        schema,
      });
      return con;
    } else {
      throw new BadRequestException({
        message: NO_FOUND_CLIENT,
      });
    }
  }
}
