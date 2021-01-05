import { Module } from '@nestjs/common';
import { WebsocketModule } from './../../websocket/websocket.module';
import { Connection } from 'typeorm';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { TestController } from './test.controller';
import { TEST_PROVIDER } from './test.dto';
import { Test } from './test.entity';
import { TestService } from './test.service';

@Module({
  imports: [WebsocketModule],
  controllers: [TestController],
  providers: [
    {
      provide: TEST_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) => connection.getRepository(Test),
    },
    TestService,
  ],
})
export class TestModule {}
