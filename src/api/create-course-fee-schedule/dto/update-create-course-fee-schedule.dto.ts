import { PartialType } from '@nestjs/mapped-types';
import { CreateCreateCourseFeeScheduleDto } from './create-create-course-fee-schedule.dto';

export class UpdateCreateCourseFeeScheduleDto extends PartialType(CreateCreateCourseFeeScheduleDto) {}
