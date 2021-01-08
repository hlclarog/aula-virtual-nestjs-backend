import { Module } from '@nestjs/common';
import { QueuesController } from './queues.controller';
import { QUEUES_PROVIDER } from './queues.dto';
import { queuesProvider } from './queues.provider';
import { QueuesService } from './queues.service';
import { InstanceProcessModule } from './instance_process/instance_process.module';
import { InstanceProcessLogModule } from './instance_process_log/instance_process_log.module';
import { MongoManagerModule } from './../database/mongo-manager.module';

@Module({
  controllers: [QueuesController],
  providers: [queuesProvider, QueuesService],
  exports: [QUEUES_PROVIDER, QueuesService],
  imports: [
    MongoManagerModule.forRoot(),
    InstanceProcessModule,
    InstanceProcessLogModule,
  ],
})
export class QueuesModule {}
