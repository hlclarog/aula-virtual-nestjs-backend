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
import { timeConvert } from './../../utils/helper';

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
  async find() {
    return await this.repository
      .createQueryBuilder('course')
      .select([
        'course.id',
        'course.name',
        'course.short_name',
        'course.description',
        'course.organization_id',
        'course.course_status_id',
        'course.user_id',
        'course.active',
        'users.id',
        'users.name',
        'course_status.id',
        'course_status.description',
        'organizations.id',
        'organizations.description',
      ])
      .leftJoin('course.user', 'users')
      .leftJoin('course.organization', 'organizations')
      .leftJoin('course.course_status', 'course_status')
      .getMany();
  }

  async findAllCatalog(
    user_id: number,
    course_id?: number,
    only_user?: boolean,
  ): Promise<Courses[] | Courses> {
    let list = [];
    let result = await this.repository
      .createQueryBuilder('course')
      .leftJoinAndSelect(
        'course.course_users',
        'course_user',
        'course_user.user_id = :user_id AND course_user.course_id = course.id',
        {
          user_id,
        },
      )
      .select([
        'course',
        'course_user.id',
        'course_user.begin_date',
        'course_user.end_date',
      ])
      .orderBy('course.id', 'ASC');
    if (only_user) {
      result = await result.where('course_user.user_id = :user_id', {
        user_id,
      });
    } else {
      result = await result.where(
        '(course_user.user_id = :user_id OR course_user.user_id IS NULL)',
        {
          user_id,
        },
      );
    }
    if (course_id) {
      result = await result.andWhere('course.id = :course_id', {
        course_id,
      });
      const course = await result.getOne();
      const item: any = Object.assign({}, course);
      delete item.course_users;
      item.student =
        course.course_users?.length > 0 ? course.course_users[0] : null;
      if (item.picture) {
        item.picture = await this.awsService.getFile(item.picture);
      }
      return item;
    } else {
      list = await result.getMany();
      list = list.map((c: any) => {
        const item: any = Object.assign({}, c);
        delete item.course_users;
        item.student = c.course_users?.length > 0 ? c.course_users[0] : null;
        return item;
      });
      for (let i = 0; i < list.length; i++) {
        const course = list[i];
        if (course.picture) {
          course.picture = await this.awsService.getFile(course.picture);
        }
      }
      return list;
    }
  }

  async findOne(id: number): Promise<Courses> {
    const course = await this.repository.findOneOrFail(id, {
      relations: [
        'course_interest_areas',
        'user',
        'course_competences',
        'course_competences.competence',
      ],
    });
    if (course.picture) {
      course.picture = await this.awsService.getFile(course.picture);
    }
    return course;
  }

  async findOneToStudent(id: number, user_id: number): Promise<Courses> {
    const course: any = await this.repository
      .createQueryBuilder('course')
      .select([
        'course.id',
        'course.name',
        'course.code',
        'course.description',
        'course.picture',
        'course.short_name',
        'course.free',
        'course.user_id',
        'course_interest_area.interest_area_id',
        'interest_area.id',
        'interest_area.description',
        'user.id',
        'user.name',
        'course_user',
        'course_user.user',
        'student.id',
        'student.name',
        'organization.id',
        'organization.name',
        'organization.description',
        'competence.id',
        'competence.description',
        'fee',
      ])
      .leftJoin('course.course_interest_areas', 'course_interest_area')
      .leftJoin('course_interest_area.interest_area', 'interest_area')
      .leftJoin('course.user', 'user')
      .leftJoin('course.organization', 'organization')
      .leftJoin('course.course_competences', 'course_competence')
      .leftJoin('course_competence.competence', 'competence')
      .leftJoin(
        'course.course_users',
        'course_user',
        'course_user.user_id = :user_id AND course_user.course_id = course.id',
        {
          user_id,
        },
      )
      .leftJoin(
        'course.course_fee_schedules',
        'fee',
        '(now() BETWEEN fee.begin AND fee.end) AND fee.course_id = course.id',
      )
      .leftJoin('course_user.user', 'student')
      .where('course.id = :id', { id })
      .getOne();
    if (course.picture) {
      course.picture = await this.awsService.getFile(course.picture);
    }
    const info_sum = await this.getDurations([String(id)]);
    if (course.course_users) {
      const user: any = Object.assign([], course.course_users);
      delete course.course_users;
      course.student = user?.length > 0 ? user[0].user : null;
    }
    if (course.course_fee_schedules) {
      const prices: any = Object.assign([], course.course_fee_schedules);
      delete course.course_fee_schedules;
      course.course_val =
        prices?.length > 0 ? Number(prices[0].course_val) : null;
      course.certificate_val =
        prices?.length > 0 ? Number(prices[0].certificate_val) : null;
      let suma = info_sum.map((i) => i.course_id).indexOf(course.id);
      suma = suma >= 0 ? info_sum[suma].duration : 0;
      course.duration = `${timeConvert(suma)}`;
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
    if (updateDto.picture) {
      data.picture = await this.setPicture(updateDto.picture);
    } else {
      delete data.picture;
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
      where: { user_id: id },
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
      .addOrderBy('course_units.order', 'ASC')
      .getOneOrFail();

    return result.course_units;
  }

  async getDurations(list: string[]): Promise<any[]> {
    const result =
      list.length > 0
        ? await this.repository
            .createQueryBuilder('course')
            .select('course.id')
            .addSelect('SUM(lessons.duration)', 'duration')
            .groupBy('course.id')
            .leftJoin('course.course_units', 'course_units')
            .leftJoin('course_units.lessons', 'lessons')
            .where(`course.id in (${list.join(',')})`)
            .getRawMany()
        : [];
    return result;
  }

  generateCode() {
    const code = generate(6);
    return code;
  }
}
