import { Module } from '@nestjs/common';
import { ActivityRelateElementsService } from './activity_relate_elements.service';
import { ActivityRelateElementsController } from './activity_relate_elements.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { ACTIVITY_RELATE_ELEMENTS_PROVIDER } from './activity_relate_elements.dto';
import { ActivityRelateElements } from './activity_relate_elements.entity';

@Module({
  controllers: [ActivityRelateElementsController],
  providers: [
    {
      provide: ACTIVITY_RELATE_ELEMENTS_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(ActivityRelateElements),
    },
    ActivityRelateElementsService,
  ],
})
export class ActivityRelateElementsModule {}
