import { BadRequestException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { getHostFromOrigin } from './../utils/helper';
import { Connection, createConnection, getConnectionManager } from 'typeorm';
import { ConfigService } from '../config/config.service';
import {
  NO_FOUND_CLIENT,
  DATABASE_TENANCY_PROVIDER,
  DATABASE_MANAGER_PROVIDER,
} from './database.dto';
import { TenancyDomains } from './../api/tenancy_domains/tenancy_domains.entity';

export const databaseTenancyProvider = {
  provide: DATABASE_TENANCY_PROVIDER,
  scope: Scope.REQUEST,
  inject: [REQUEST, ConfigService, DATABASE_MANAGER_PROVIDER],
  useFactory: async (
    req: Request,
    config: ConfigService,
    connManager: Connection,
  ) => {
    const host = getHostFromOrigin(req.headers['origin']);
    const dataHost: TenancyDomains = await connManager
      .getRepository(TenancyDomains)
      .findOne({
        relations: ['tenancy'],
        where: { description: host },
      });
    if (dataHost) {
      const connectionName = `tenant_${dataHost.tenancy.schema}`;
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
        migrations: [__dirname + '/../migrations/tenancy/*{.ts,.js}'],
        entities: [__dirname + '/../api/**/*.entity{.ts,.js}'],
        cli: { migrationsDir: __dirname + '/../migrations/tenancy' },
        synchronize: false,
        name: connectionName,
        schema: dataHost.tenancy.schema,
      });
      return con;
    } else {
      throw new BadRequestException({
        message: NO_FOUND_CLIENT,
      });
    }
  },
};
