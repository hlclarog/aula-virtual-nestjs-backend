import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import { DATABASE_PROVIDER, TENANCY_PROVIDER } from '../../database/database.dto';
import { TestController } from './test.controller';
import { TEST_PROVIDER } from './test.dto';
import { Test } from './test.entity';
import { TestService } from './test.service';

@Module({
  controllers: [TestController],
  providers: [
    {
      provide: TEST_PROVIDER,
      inject: [TENANCY_PROVIDER],
      useFactory: (connection: Connection) => connection.getRepository(Test),
    },
    TestService,
  ],
})
export class TestModule {}
