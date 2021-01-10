import { Body, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import { PermissionsGuard } from '../../utils/guards/permissions.guard';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { INSTANCE_PROCESS_QUEUE } from './../../queues/instance_process/instance_process.dto';

@UseGuards(PermissionsGuard)
@ControllerApi({ name: 'test' })
export class TestController {
  constructor(
    @InjectQueue(INSTANCE_PROCESS_QUEUE)
    private readonly instanceProcessQueue: Queue,
  ) {}

  @Post('queue_tenancy')
  // @RequirePermissions([TEST_PERMISSIONS.LIST])
  public async get(@Body() data: any) {
    await this.instanceProcessQueue.add('create', data);
    return { data: true };
  }
}
