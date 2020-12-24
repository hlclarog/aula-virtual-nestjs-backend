import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { InstanceProcessController } from './instance_process.controller';
import { InstanceProcessProcessor } from './instance_process.processor';
import { INSTANCE_PROCESS_QUEUE } from './instance_process.dto';

@Module({
  imports: [
    BullModule.registerQueue({
      name: INSTANCE_PROCESS_QUEUE,
    }),
  ],
  controllers: [InstanceProcessController],
  providers: [InstanceProcessProcessor],
})
export class InstanceProcessModule {}
