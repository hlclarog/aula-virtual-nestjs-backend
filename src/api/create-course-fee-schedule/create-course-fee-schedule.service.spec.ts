import { Test, TestingModule } from '@nestjs/testing';
import { CreateCourseFeeScheduleService } from './create-course-fee-schedule.service';

describe('CreateCourseFeeScheduleService', () => {
  let service: CreateCourseFeeScheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateCourseFeeScheduleService],
    }).compile();

    service = module.get<CreateCourseFeeScheduleService>(CreateCourseFeeScheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
