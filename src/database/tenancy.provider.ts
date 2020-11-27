import { Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { createConnection, getConnectionManager } from 'typeorm';
import { ConfigService } from "../config/config.service";
import { TENANCY_PROVIDER } from "./database.dto";

export const tenancyProvider = {
  provide: TENANCY_PROVIDER,
  scope: Scope.REQUEST,
  inject: [REQUEST, ConfigService],
  useFactory: async (req, config: ConfigService) => {
    const clientName = req.headers['x-mangus-client']
    if (clientName) {
      const connectionName = `tenant_${clientName}`;
      const connectionManager = getConnectionManager();
      if (connectionManager.has(connectionName)) {
        const connection = connectionManager.get(connectionName);
        return Promise.resolve(connection.isConnected ? connection : connection.connect());
      }
      return createConnection({
        type: 'postgres',
        host: config.hostDatabase(),
        port: config.portDatabase(),
        username: config.userDatabase(),
        password: config.passDatabase(),
        database: config.nameDatabase(),
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
        name: connectionName,
        schema: clientName,
      });
    }
  },
};