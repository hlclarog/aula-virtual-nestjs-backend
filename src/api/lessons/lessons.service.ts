import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../../base/base.service';
import {
  COURSE_UNITS_PROVIDER,
  CreateLessonsDto,
  UpdateLessonsDto,
} from './lessons.dto';
import { Lessons } from './lessons.entity';
import { BaseRepo } from '../../base/base.repository';
import { AwsService } from './../../aws/aws.service';
import { typeFilesAwsNames } from './../../aws/aws.dto';
import * as shortid from 'shortid';
import { UpdateResult } from 'typeorm';

@Injectable()
export class LessonsService extends BaseService<
  Lessons,
  CreateLessonsDto,
  UpdateLessonsDto
> {
  @Inject(COURSE_UNITS_PROVIDER) repository: BaseRepo<Lessons>;

  constructor(private awsService: AwsService) {
    super();
  }

  async findOne(id: number): Promise<Lessons> {
    const lesson = await this.repository.findOneOrFail(id);
    if (lesson.video_url) {
      lesson.video_url = await this.awsService.getFile(lesson.video_url);
    }
    return lesson;
  }

  async create(createDto: CreateLessonsDto) {
    const data: any = Object.assign({}, createDto);
    if (createDto.video_url) {
      data.video_url = await this.setVideo(createDto.video_url);
    }
    const dataNew = await this.repository.save(data);
    return dataNew;
  }

  async update(id: number, updateDto: UpdateLessonsDto): Promise<UpdateResult> {
    const data: any = Object.assign({}, updateDto);
    if (updateDto.video_url) {
      data.video_url = await this.setVideo(updateDto.video_url);
    }
    return await this.repository.update(id, data);
  }

  async setVideo(file) {
    const result = await this.awsService.saveFile({
      file,
      name: shortid.generate(),
      type: typeFilesAwsNames.lesson_videos,
    });
    return result.Key;
  }

  async findByCourse(id: number): Promise<Lessons[]> {
    return await this.repository.find({
      where: { course: id },
    });
  }

  async changeOrder(data: {
    id_lesson: number;
    id_unit: number;
    new_order: number;
  }): Promise<any> {
    const listLessons: Lessons[] = await this.repository
      .createQueryBuilder('lessons')
      .where(
        'lessons.id != :id_lesson AND lessons.course_unit_id = :id_unit AND lessons.order >= :new_order',
        {
          id_lesson: data.id_lesson,
          id_unit: data.id_unit,
          new_order: data.new_order,
        },
      )
      .orderBy('lessons.order', 'ASC')
      .getMany();

    let order = data.new_order;
    for (const f of listLessons) {
      order += 1;
      await this.repository
        .createQueryBuilder()
        .update()
        .set({ order: order })
        .where('id = :id_lesson', {
          id_lesson: f.id,
        })
        .execute();
    }

    return await this.repository
      .createQueryBuilder()
      .update()
      .set({ course_unit: data.id_unit, order: data.new_order })
      .where('id = :id_lesson', {
        id_lesson: data.id_lesson,
      })
      .execute();
  }
}
