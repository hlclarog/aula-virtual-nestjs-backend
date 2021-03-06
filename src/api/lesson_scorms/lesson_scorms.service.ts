import { Inject, Injectable } from '@nestjs/common';
import {
  CreateLessonScormsDto,
  UpdateLessonScormsDto,
  LESSON_SCORMS_PROVIDER,
} from './lesson_scorms.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { LessonScorms } from './lesson_scorms.entity';
import { AwsService } from './../../aws/aws.service';
import { typeFilesAwsNames } from './../../aws/aws.dto';
import { LESSON_SCORM_RESOURCES_PROVIDER } from '../lesson_scorm_resources/lesson_scorm_resources.dto';
import { LessonScormResources } from '../lesson_scorm_resources/lesson_scorm_resources.entity';
import * as shortid from 'shortid';

@Injectable()
export class LessonScormsService extends BaseService<
  LessonScorms,
  CreateLessonScormsDto,
  UpdateLessonScormsDto
> {
  @Inject(LESSON_SCORMS_PROVIDER) repository: BaseRepo<LessonScorms>;
  @Inject(LESSON_SCORM_RESOURCES_PROVIDER)
  repository_resources: BaseRepo<LessonScormResources>;

  constructor(private awsService: AwsService) {
    super();
  }

  async getByLesson(id: number): Promise<any> {
    const data = await this.repository
      .createQueryBuilder('lesson_scorm')
      .select([
        'lesson_scorm.id',
        'lesson_scorm.lesson_id',
        'lesson_scorm.content',
        'lesson_scorm.identifier',
        'lesson_scorm.title',
        'lesson_scorm_resource.index',
        'lesson_scorm_resource.identifier',
      ])
      .leftJoin('lesson_scorm.lesson_scorm_resources', 'lesson_scorm_resource')
      .where('lesson_id = :id', { id: id })
      .getMany();

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (item.lesson_scorm_resources.length > 0) {
        item['index'] = item.lesson_scorm_resources[0].index;
        item['identifier'] = item.lesson_scorm_resources[0].identifier;
      }
      if (item.content) {
        const content = `${item.content}/${item['identifier']}`;
        item.content = await this.awsService.getFile(content);
      }
    }

    return data;
  }

  async findOne(id: number): Promise<LessonScorms> {
    const lesson_scorm = await this.repository.findOneOrFail(id);
    const lesson_scorm_resource = await this.repository_resources.findOneOrFail(
      {
        lesson_scorm_id: id,
      },
    );
    if (lesson_scorm.content) {
      lesson_scorm.content = await this.awsService.getFile(
        `${lesson_scorm.content}/${lesson_scorm_resource.index}`,
      );
    }
    return lesson_scorm;
  }

  async create(createDto: CreateLessonScormsDto) {
    const data: any = Object.assign({}, createDto);
    const result = await this.setContent(createDto.content);
    data.content = result.Key;
    data.identifier = result.info.identifier;
    data.title = result.info.title;
    const dataNew = await this.repository.save(data);
    await this.repository_resources.save({
      lesson_scorm_id: dataNew.id,
      identifier: result.info.identifier,
      index: result.info.index,
    });
    if (dataNew.content) {
      dataNew.content = await this.awsService.getFile(
        `${result.Key}/${result.info.index}`,
      );
    }
    return dataNew;
  }

  async setContent(file) {
    const result = await this.awsService.saveZipScormContent({
      file,
      name: shortid.generate(),
      type: typeFilesAwsNames.lesson_scorms,
    });
    return result;
  }
}
