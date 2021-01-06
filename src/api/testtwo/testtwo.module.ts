import { Module } from '@nestjs/common';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { TESTTWO_PROVIDER } from './dto/create-testtwo.dto';
import { TesttwoService } from './testtwo.service';
import { TesttwoController } from './testtwo.controller';
import { Testtwo } from './entities/testtwo.entity';

@Module({
  controllers: [TesttwoController],
  providers: [
    {
      provide: TESTTWO_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(Testtwo).queryRunner.createSchema(''),
    },
    TesttwoService,
  ],
})
export class TesttwoModule {}
