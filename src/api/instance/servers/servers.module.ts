import { Module } from '@nestjs/common';
import { ServersService } from './servers.service';
import { ServersController } from './servers.controller';
import { DATABASE_MANAGER_PROVIDER } from '../../../database/database.dto';
import { Connection } from 'typeorm';
import { SERVERS_PROVIDER } from './servers.dto';
import { Servers } from './servers.entity';

@Module({
  controllers: [ServersController],
  providers: [
    {
      provide: SERVERS_PROVIDER,
      inject: [DATABASE_MANAGER_PROVIDER],
      useFactory: (connection: Connection) => connection.getRepository(Servers),
    },
    ServersService,
  ],
})
export class ServersModule {}
