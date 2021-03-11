import { Module } from '@nestjs/common';
import { PointReasonsService } from './point_reasons.service';
import { PointReasonsController } from './point_reasons.controller';
import { DATABASE_MANAGER_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { POINT_REASONS_PROVIDER } from './point_reasons.dto';
import { PointReasons } from './point_reasons.entity';

@Module({
  controllers: [PointReasonsController],
  providers: [
    {
      provide: POINT_REASONS_PROVIDER,
      inject: [DATABASE_MANAGER_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(PointReasons),
    },
    PointReasonsService,
  ],
})
export class PointReasonsModule {}
