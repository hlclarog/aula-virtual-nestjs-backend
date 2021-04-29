import { Module } from '@nestjs/common';
import { BannersService } from './banners.service';
import { BannersController } from './banners.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { BANNERS_PROVIDER } from './banners.dto';
import { Banners } from './banners.entity';

@Module({
  controllers: [BannersController],
  providers: [
    {
      provide: BANNERS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) => connection.getRepository(Banners),
    },
    BannersService,
  ],
})
export class BannersModule {}
