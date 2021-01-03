import { Module } from '@nestjs/common';
import { ConnectionTypesService } from './connection_types.service';
import { ConnectionTypesController } from './connection_types.controller';
import { DATABASE_MANAGER_PROVIDER} from '../../../database/database.dto';
import { Connection } from 'typeorm';
import { CONNECTION_TYPES_PROVIDER } from './connection_types.dto';
import { ConnectionTypes } from './connection_types.entity';

@Module({
  controllers: [ConnectionTypesController],
  providers: [
    {
      provide: CONNECTION_TYPES_PROVIDER,
      inject: [DATABASE_MANAGER_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(ConnectionTypes),
    },
    ConnectionTypesService,
  ],
})
export class ConnectionTypesModule {}
