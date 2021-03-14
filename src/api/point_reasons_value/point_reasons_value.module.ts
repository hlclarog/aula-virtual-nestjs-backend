import { Module } from '@nestjs/common';
import { PointReasonsValueService } from './point_reasons_value.service';
import { PointReasonsValueController } from './point_reasons_value.controller';
import { Connection } from 'typeorm';
import { POINT_REASON_PROVIDER } from './point_reasons_value.dto';
import { PointReasonsValue } from './point_reasons_value.entity';
import { DATABASE_TENANCY_PROVIDER } from './../../database/database.dto';

@Module({
  imports: [],
  controllers: [PointReasonsValueController],
  providers: [
    {
      provide: POINT_REASON_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(PointReasonsValue),
    },
    PointReasonsValueService,
  ],
  exports: [POINT_REASON_PROVIDER, PointReasonsValueService],
})
export class PointReasonsValueModule {}
