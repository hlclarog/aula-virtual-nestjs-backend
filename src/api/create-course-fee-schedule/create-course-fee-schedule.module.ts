import { Module } from '@nestjs/common';
import { CreateCourseFeeScheduleService } from './create-course-fee-schedule.service';
import { CreateCourseFeeScheduleController } from './create-course-fee-schedule.controller';

@Module({
  controllers: [CreateCourseFeeScheduleController],
  providers: [CreateCourseFeeScheduleService]
})
export class CreateCourseFeeScheduleModule {}
