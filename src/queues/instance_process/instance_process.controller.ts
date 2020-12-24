import { InjectQueue } from '@nestjs/bull';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Queue } from 'bull';
import { INSTANCE_PROCESS_QUEUE } from './instance_process.dto';

@ApiTags('queue_instance')
@Controller('queues/instance_process')
export class InstanceProcessController {
  constructor(
    @InjectQueue(INSTANCE_PROCESS_QUEUE)
    private readonly instanceProcessQueue: Queue,
  ) {}

  @Get('create/:name')
  async create(@Param('name') name: string) {
    this.instanceProcessQueue.add('create', {
      name,
    });
    return {
      message: 'Processing',
    };
  }
}
