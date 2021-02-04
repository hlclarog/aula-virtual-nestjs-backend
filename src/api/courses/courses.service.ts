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
import { CourseUnits } from '../course_units/course_units.entity';
import { AwsService } from '../../aws/aws.service';
import { typeFilesAwsNames } from '../../aws/aws.dto';
import * as shortid from 'shortid';
import { generate } from '../../utils/random';

@Injectable()
export class CoursesService extends BaseService<
  Courses,
  CreateCourseDto,
  UpdateCourseDto
> {
  @Inject(COURSES_PROVIDER) repository: BaseRepo<Courses>;

  constructor(
    private courseInterestAreasService: CourseInterestAreasService,
    private awsService: AwsService,
  ) {
    super();
  }

  async findOne(id: number): Promise<Courses> {
    const course = await this.repository.findOneOrFail(id, {
      relations: ['course_interest_areas'],
    });
    if (course.picture) {
      course.picture = await this.awsService.getFile(course.picture);
    }
    return course;
  }

  async create(createDto: CreateCourseDto) {
    const data: any = Object.assign({}, createDto);
    delete data.interest_areas;
    if (createDto.picture) {
      data.picture = await this.setPicture(createDto.picture);
    }
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
    if (updateDto.picture.length > 0) {
      data.picture = await this.setPicture(updateDto.picture);
    }
    if (updateDto.interest_areas) {
      await this.courseInterestAreasService.set(id, updateDto.interest_areas);
    }
    return await this.repository.update(id, data);
  }

  async setPicture(file) {
    const result = await this.awsService.saveFile({
      file,
      name: shortid.generate(),
      type: typeFilesAwsNames.courses_pictures,
    });
    return result.Key;
  }

  async findByTeacher(id: number): Promise<Courses[]> {
    const courses = await this.repository.find({
      where: { user: id },
      relations: [
        'user',
        'organization',
        'course_status',
        'course_fee_schedules',
        'course_users',
        'program_courses',
        'course_interest_areas',
        'course_competences',
      ],
    });
    for (let i = 0; i < courses.length; i++) {
      const course = courses[i];
      if (course.picture) {
        course.picture = await this.awsService.getFile(course.picture);
      }
    }
    return courses;
  }

  async searchByName(name: string): Promise<any> {
    return await this.repository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.organization', 'organization')
      .leftJoinAndSelect('course.course_status', 'course_status')
      .where(
        'LOWER(course.name) LIKE(LOWER(:name)) OR' +
          ' LOWER(course.description) LIKE(LOWER(:name)) OR' +
          ' LOWER(organization.name) LIKE(LOWER(:name)) OR' +
          ' LOWER(course_status.description) LIKE(LOWER(:name)) OR' +
          ' LOWER(course.short_name) LIKE(LOWER(:name))',
        {
          name: `%${name}%`,
        },
      )
      .getMany();
  }

  async getUnitsLessons(id: number): Promise<CourseUnits[]> {
    const result = await this.repository
      .createQueryBuilder('course')
      .leftJoinAndSelect('course.course_units', 'course_units')
      .leftJoinAndSelect('course_units.lessons', 'lessons')
      .where('course.id = :id', { id })
      .orderBy('lessons.order', 'ASC')
      .orderBy('course_units.order', 'ASC')
      .getOneOrFail();

    return result.course_units;
  }

  generateCode() {
    const code = generate(6);
    return code;
  }
}
