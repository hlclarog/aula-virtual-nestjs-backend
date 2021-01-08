import { HttpModule, Module } from '@nestjs/common';
import { InstanceProcessController } from './instance_process.controller';
import { InstanceProcessProcessor } from './instance_process.processor';
import { InstanceProcessQueueModule } from './instance_process.dto';
import { InstanceProcessLogModule } from '../instance_process_log/instance_process_log.module';

@Module({
  imports: [HttpModule, InstanceProcessQueueModule, InstanceProcessLogModule],
  exports: [InstanceProcessQueueModule],
  controllers: [InstanceProcessController],
  providers: [InstanceProcessProcessor],
})
export class InstanceProcessModule {}
