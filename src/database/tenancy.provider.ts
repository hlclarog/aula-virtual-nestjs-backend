import { BadRequestException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { createConnection, getConnectionManager } from 'typeorm';
import { ConfigService } from '../config/config.service';
import { NO_FOUND_CLIENT, TENANCY_PROVIDER } from './database.dto';

export const tenancyProvider = {
  provide: TENANCY_PROVIDER,
  scope: Scope.REQUEST,
  inject: [REQUEST, ConfigService],
  useFactory: async (req, config: ConfigService) => {
    const clientName = req.headers['x-mangus-client'];
    if (clientName) {
      const connectionName = `tenant_${clientName}`;
      const connectionManager = await getConnectionManager();
      if (connectionManager.has(connectionName)) {
        const connection = await connectionManager.get(connectionName);
        return Promise.resolve(
          connection.isConnected ? connection : connection.connect(),
        );
      }
      const con = await createConnection({
        type: 'postgres',
        host: config.hostDatabase(),
        port: config.portDatabase(),
        username: config.userDatabase(),
        password: config.passDatabase(),
        database: config.nameDatabase(),
        migrationsTableName: 'migrations_registers',
        migrations: [__dirname + '/../migrations/*{.ts,.js}'],
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        cli: { migrationsDir: __dirname + '/../migrations' },
        synchronize: true,
        name: connectionName,
        schema: clientName,
      });
      return con;
    } else {
      throw new BadRequestException({
        message: NO_FOUND_CLIENT,
      });
    }
  },
};
