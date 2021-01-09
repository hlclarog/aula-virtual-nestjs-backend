import { Module } from '@nestjs/common';
import { InstanceProcessModule } from './../../queues/instance_process/instance_process.module';
import { WebsocketModule } from './../../websocket/websocket.module';
import { TestController } from './test.controller';

@Module({
  imports: [InstanceProcessModule, WebsocketModule],
  controllers: [TestController],
  providers: [],
})
export class TestModule {}
