import { Module } from '@nestjs/common';
import { MONGO_MANAGER_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { Channels } from './channels.entity';
import { CHANNELS_PROVIDER } from './channels.dto';
import { ChannelsService } from './channels.service';

@Module({
  controllers: [],
  providers: [
    {
      provide: CHANNELS_PROVIDER,
      inject: [MONGO_MANAGER_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(Channels),
    },
    ChannelsService,
  ],
  exports: [ChannelsService],
})
export class ChannelsModule {}
