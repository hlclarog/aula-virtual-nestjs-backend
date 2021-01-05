import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { DATABASE_MANAGER_PROVIDER } from '../../database/database.dto';
import { TestController } from './test.controller';
import { TEST_PROVIDER } from './test.dto';
import { Test } from './test.entity';
import { TestService } from './test.service';

@Module({
  controllers: [TestController],
  providers: [
    {
      provide: TEST_PROVIDER,
      inject: [DATABASE_MANAGER_PROVIDER],
      useFactory: (connection: Connection) => connection.getRepository(Test),
    },
    TestService,
  ],
})
export class TestModule {}
