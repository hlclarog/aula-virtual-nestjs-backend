import { Inject, Injectable } from '@nestjs/common';
import {
  CreateLessonDetailsDto,
  UpdateLessonDetailsDto,
  LESSON_DETAILS_PROVIDER,
  UpdateOrderLessonDetailsDto,
} from './lesson_details.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { LessonDetails } from './lesson_details.entity';
import { AwsService } from './../../aws/aws.service';
import { typeFilesAwsNames } from './../../aws/aws.dto';
import * as shortid from 'shortid';
import { CONTENT_TYPES_S3 } from '../content_types/content_types.dto';

@Injectable()
export class LessonDetailsService extends BaseService<
  LessonDetails,
  CreateLessonDetailsDto,
  UpdateLessonDetailsDto
> {
  @Inject(LESSON_DETAILS_PROVIDER) repository: BaseRepo<LessonDetails>;

  constructor(private awsService: AwsService) {
    super();
  }

  validateContentType(id: number): boolean {
    return CONTENT_TYPES_S3.indexOf(id) >= 0;
  }

  async getContentFile(content: string) {
    return await this.awsService.getFile(content);
  }

  async findOne(id: number): Promise<LessonDetails> {
    const lesson_detail = await this.repository.findOneOrFail(id);
    if (
      lesson_detail.content &&
      this.validateContentType(lesson_detail.content_type_id)
    ) {
      const content = lesson_detail.content;
      lesson_detail.content = await this.getContentFile(content);
      lesson_detail['metadata'] = await this.awsService.getMetadata(content);
    }
    return lesson_detail;
  }

  async getByLesson(id: number): Promise<any> {
    const data = await this.repository
      .createQueryBuilder('lesson_details')
      .where('lesson_id = :id', { id: id })
      .orderBy('lesson_details.order', 'ASC')
      .getMany();

    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (item.content && this.validateContentType(item.content_type_id)) {
        const content = item.content;
        item.content = await this.awsService.getFile(content);
        item['metadata'] = await this.awsService.getMetadata(content);
      }
    }

    return data;
  }

  async create(createDto: CreateLessonDetailsDto) {
    const data: any = Object.assign({}, createDto);
    if (createDto.content) {
      data.content = await this.setContent(
        createDto.content,
        createDto.content_type_id,
      );
    }
    const dataNew = await this.repository.save(data);
    return dataNew;
  }

  async update(id: number, updateDto: UpdateLessonDetailsDto) {
    const data: any = Object.assign({}, updateDto);
    if (updateDto.content) {
      data.content = await this.setContent(
        updateDto.content,
        updateDto.content_type_id,
      );
    }
    return await this.repository.update(id, data);
  }

  async reorder(updateDto: UpdateOrderLessonDetailsDto) {
    for (let i = 0; i < updateDto.details.length; i++) {
      const element = updateDto.details[i];
      await this.repository.update(element, { order: i + 1 });
    }
    return { reorder: true };
  }

  async setContent(file, type) {
    if (this.validateContentType(type)) {
      const result = await this.awsService.saveFile({
        file,
        name: shortid.generate(),
        type: typeFilesAwsNames.lesson_details_files,
      });
      return result.Key;
    } else {
      return file;
    }
  }
}
