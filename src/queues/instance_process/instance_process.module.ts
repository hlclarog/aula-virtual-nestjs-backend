import { HttpModule, Module } from '@nestjs/common';
import { InstanceProcessController } from './instance_process.controller';
import { InstanceProcessProcessor } from './instance_process.processor';
import { InstanceProcessQueueModule } from './instance_process.dto';

@Module({
  imports: [HttpModule, InstanceProcessQueueModule],
  exports: [InstanceProcessQueueModule],
  controllers: [InstanceProcessController],
  providers: [InstanceProcessProcessor],
})
export class InstanceProcessModule {}
