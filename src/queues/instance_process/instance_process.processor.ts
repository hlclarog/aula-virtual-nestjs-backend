import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { INSTANCE_PROCESS_QUEUE } from './instance_process.dto';

@Processor(INSTANCE_PROCESS_QUEUE)
export class InstanceProcessProcessor {
  private readonly logger = new Logger(InstanceProcessProcessor.name);

  @Process('create')
  createInstanceProcess({ data }: Job) {
    this.logger.debug(`Creating ${data.name} instance...`);
    setTimeout(() => {
      this.logger.debug(data);
    }, 3000);
    setTimeout(() => {
      this.logger.debug(`Instanced ${data.name} created`);
    }, 5000);
  }
}
