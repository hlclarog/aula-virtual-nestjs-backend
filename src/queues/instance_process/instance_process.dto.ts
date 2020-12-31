import { BullModule, BullModuleOptions } from '@nestjs/bull';

export const INSTANCE_PROCESS_QUEUE = 'INSTANCE_PROCESS';

export const InstanceProcessQueueModule = BullModule.registerQueueAsync({
  name: INSTANCE_PROCESS_QUEUE,
  useFactory: (): BullModuleOptions => {
    return {
      name: INSTANCE_PROCESS_QUEUE,
    };
  },
});
