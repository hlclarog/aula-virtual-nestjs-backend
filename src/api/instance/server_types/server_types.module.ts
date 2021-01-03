import { Module } from '@nestjs/common';
import { ServerTypesService } from './server_types.service';
import { ServerTypesController } from './server_types.controller';
import { DATABASE_MANAGER_PROVIDER} from '../../../database/database.dto';
import { Connection } from 'typeorm';
import { SERVER_TYPES_PROVIDER } from './server_types.dto';
import { ServerTypes } from './server_types.entity';

@Module({
  controllers: [ServerTypesController],
  providers: [
    {
      provide: SERVER_TYPES_PROVIDER,
      inject: [DATABASE_MANAGER_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(ServerTypes),
    },
    ServerTypesService,
  ],
})
export class ServerTypesModule {}
