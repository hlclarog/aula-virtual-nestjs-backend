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
import * as shortid from 'shortid';

@Injectable()
export class LessonScormsService extends BaseService<
  LessonScorms,
  CreateLessonScormsDto,
  UpdateLessonScormsDto
> {
  @Inject(LESSON_SCORMS_PROVIDER) repository: BaseRepo<LessonScorms>;

  constructor(private awsService: AwsService) {
    super();
  }

  async findOne(id: number): Promise<LessonScorms> {
    const lesson_scorm = await this.repository.findOneOrFail(id);
    if (lesson_scorm.content) {
      lesson_scorm.content = await this.awsService.getFile(
        lesson_scorm.content,
      );
    }
    return lesson_scorm;
  }

  async create(createDto: CreateLessonScormsDto) {
    const data: any = Object.assign({}, createDto);
    if (createDto.content) {
      data.content = await this.setContent(createDto.content);
    }
    const dataNew = await this.repository.save(data);
    return dataNew;
  }

  async update(id: number, updateDto: UpdateLessonScormsDto) {
    const data: any = Object.assign({}, updateDto);
    if (updateDto.content) {
      data.content = await this.setContent(updateDto.content);
    }
    return await this.repository.update(id, data);
  }

  async setContent(file) {
    const result = await this.awsService.saveZipContent({
      file,
      name: shortid.generate(),
      type: typeFilesAwsNames.lesson_scorms,
    });
    return result.Key;
  }
}
