import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { DATABASE_MANAGER_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { CLIENTS_PROVIDER } from './clients.dto';
import { Clients } from './clients.entity';

@Module({
  controllers: [ClientsController],
  providers: [
    {
      provide: CLIENTS_PROVIDER,
      inject: [DATABASE_MANAGER_PROVIDER],
      useFactory: (connection: Connection) => connection.getRepository(Clients),
    },
    ClientsService,
  ],
})
export class ClientsModule {}
