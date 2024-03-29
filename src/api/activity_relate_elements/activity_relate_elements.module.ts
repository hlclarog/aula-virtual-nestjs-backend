import { Module } from '@nestjs/common';
import { ActivityRelateElementsService } from './activity_relate_elements.service';
import { ActivityRelateElementsController } from './activity_relate_elements.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { ACTIVITY_RELATE_ELEMENTS_PROVIDER } from './activity_relate_elements.dto';
import { ActivityRelateElements } from './activity_relate_elements.entity';
import { RelateElementAnswersModule } from '../relate_element_answers/relate_element_answers.module';
import { AwsModule } from '../../aws/aws.module';
@Module({
  imports: [RelateElementAnswersModule, AwsModule],
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
  exports: [ACTIVITY_RELATE_ELEMENTS_PROVIDER, ActivityRelateElementsService],
})
export class ActivityRelateElementsModule {}
