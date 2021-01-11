import { Injectable } from '@nestjs/common';
import { CreateCreateCourseFeeScheduleDto } from './dto/create-create-course-fee-schedule.dto';
import { UpdateCreateCourseFeeScheduleDto } from './dto/update-create-course-fee-schedule.dto';

@Injectable()
export class CreateCourseFeeScheduleService {
  create(createCreateCourseFeeScheduleDto: CreateCreateCourseFeeScheduleDto) {
    return 'This action adds a new createCourseFeeSchedule';
  }

  findAll() {
    return `This action returns all createCourseFeeSchedule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} createCourseFeeSchedule`;
  }

  update(id: number, updateCreateCourseFeeScheduleDto: UpdateCreateCourseFeeScheduleDto) {
    return `This action updates a #${id} createCourseFeeSchedule`;
  }

  remove(id: number) {
    return `This action removes a #${id} createCourseFeeSchedule`;
  }
}
