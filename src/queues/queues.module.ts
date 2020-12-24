import { Module } from '@nestjs/common';
import { QueuesController } from './queues.controller';
import { QUEUES_PROVIDER } from './queues.dto';
import { queuesProvider } from './queues.provider';
import { QueuesService } from './queues.service';
import { InstanceProcessModule } from './instance_process/instance_process.module';

@Module({
  controllers: [QueuesController],
  providers: [queuesProvider, QueuesService],
  exports: [QUEUES_PROVIDER, QueuesService],
  imports: [InstanceProcessModule],
})
export class QueuesModule {}
