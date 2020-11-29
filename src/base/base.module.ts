import { Module } from '@nestjs/common';
import { BaseService } from './base.service';
import { BaseController } from './base.controller';
import { BASE_PROVIDER } from './dto/create-base.dto';
import { DATABASE_PROVIDER } from '../database/database.dto';
import { Connection } from 'typeorm';
import { Base } from './entities/base.entity';

@Module({
  controllers: [BaseController],
  providers: [
    {
      provide: BASE_PROVIDER,
      inject: [DATABASE_PROVIDER],
      useFactory: (connection: Connection) => connection.getRepository(Base),
    },
    BaseService,
  ],
})
export class BaseModule {}
