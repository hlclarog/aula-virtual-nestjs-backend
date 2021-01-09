import { Module } from '@nestjs/common';
import { MONGO_MANAGER_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { IntanceProcessLog } from './instance_process_log.entity';
import { INSTANCE_PROCESS_LOG_PROVIDER } from './instance_process_log.dto';
import { InstanceProcessLogService } from './instance_process_log.service';
import { WebsocketModule } from './../../websocket/websocket.module';

@Module({
  imports: [WebsocketModule],
  providers: [
    {
      provide: INSTANCE_PROCESS_LOG_PROVIDER,
      inject: [MONGO_MANAGER_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(IntanceProcessLog),
    },
    InstanceProcessLogService,
  ],
  exports: [InstanceProcessLogService],
})
export class InstanceProcessLogModule {}
