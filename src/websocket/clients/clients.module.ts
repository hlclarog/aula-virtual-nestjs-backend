import { Module } from '@nestjs/common';
import { MONGO_MANAGER_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { Clients } from './clients.entity';
import { CLIENTS_PROVIDER } from './clients.dto';
import { ClientsService } from './clients.service';
import { ChannelsModule } from '../channels/channels.module';

@Module({
  imports: [ChannelsModule],
  providers: [
    {
      provide: CLIENTS_PROVIDER,
      inject: [MONGO_MANAGER_PROVIDER],
      useFactory: (connection: Connection) => connection.getRepository(Clients),
    },
    ClientsService,
  ],
  exports: [ClientsService],
})
export class ClientsModule {}
