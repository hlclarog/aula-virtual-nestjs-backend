import { Test, TestingModule } from '@nestjs/testing';
import { CreateCourseFeeScheduleController } from './create-course-fee-schedule.controller';
import { CreateCourseFeeScheduleService } from './create-course-fee-schedule.service';

describe('CreateCourseFeeScheduleController', () => {
  let controller: CreateCourseFeeScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateCourseFeeScheduleController],
      providers: [CreateCourseFeeScheduleService],
    }).compile();

    controller = module.get<CreateCourseFeeScheduleController>(CreateCourseFeeScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
