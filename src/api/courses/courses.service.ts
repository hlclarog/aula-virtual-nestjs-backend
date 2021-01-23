import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../../base/base.service';
import {
  COURSES_PROVIDER,
  CreateCourseDto,
  UpdateCourseDto,
} from './courses.dto';
import { BaseRepo } from '../../base/base.repository';
import { Courses } from './courses.entity';
import { UpdateResult } from 'typeorm';
import { CourseInterestAreasService } from '../course_interest_areas/course_interest_areas.service';

@Injectable()
export class CoursesService extends BaseService<
  Courses,
  CreateCourseDto,
  UpdateCourseDto
> {
  @Inject(COURSES_PROVIDER) repository: BaseRepo<Courses>;

  constructor(private courseInterestAreasService: CourseInterestAreasService) {
    super();
  }

  async findOne(id: number): Promise<Courses> {
    return this.repository.findOneOrFail(id, {
      relations: ['course_interest_areas'],
    });
  }

  async create(createDto: CreateCourseDto) {
    const data: any = Object.assign({}, createDto);
    delete data.interest_areas;
    const dataNew = await this.repository.save(data);
    if (createDto.interest_areas) {
      await this.courseInterestAreasService.set(
        dataNew.id,
        createDto.interest_areas,
      );
    }
    return dataNew;
  }

  async update(id: number, updateDto: UpdateCourseDto): Promise<UpdateResult> {
    const data: any = Object.assign({}, updateDto);
    delete data.interest_areas;
    if (updateDto.interest_areas) {
      await this.courseInterestAreasService.set(id, updateDto.interest_areas);
    }
    return await this.repository.update(id, data);
  }
}
