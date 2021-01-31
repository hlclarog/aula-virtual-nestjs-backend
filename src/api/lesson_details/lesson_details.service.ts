import { Inject, Injectable } from '@nestjs/common';
import {
  CreateLessonDetailsDto,
  UpdateLessonDetailsDto,
  LESSON_DETAILS_PROVIDER,
} from './lesson_details.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { LessonDetails } from './lesson_details.entity';
import { AwsService } from './../../aws/aws.service';
import { typeFilesAwsNames } from './../../aws/aws.dto';
import * as shortid from 'shortid';

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

  validateLessonType(id: number): boolean {
    return [2, 3, 7].indexOf(id) >= 0;
  }

  validateContentType(id: number): boolean {
    return [2, 3, 7].indexOf(id) >= 0;
  }

  async getContentFile(content: string) {
    return await this.awsService.getFile(content);
  }

  async findOne(id: number): Promise<LessonDetails> {
    const lesson_detail = await this.repository.findOneOrFail(id);
    if (
      lesson_detail.content &&
      this.validateLessonType(lesson_detail.content_type_id)
    ) {
      lesson_detail.content = await this.getContentFile(lesson_detail.content);
    }
    return lesson_detail;
  }

  async getByLesson(id: number): Promise<any> {
    // const data = await this.repository.find({
    //   where: [{ lesson_id: id }],
    // });

    const data = await this.repository
      .createQueryBuilder('lesson_details')
      .where('lesson_id = :id', { id: id })
      .getMany();

    data.forEach(async (item) => {
      if (item.content && this.validateContentType(item.content_type_id)) {
        item.content = await this.awsService.getFile(item.content);
      }
    });

    return data;
  }

  async create(createDto: CreateLessonDetailsDto) {
    const data: any = Object.assign({}, createDto);
    if (createDto.content) {
      data.content = await this.setContent(
        createDto.content,
        createDto.content_type,
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
        updateDto.content_type,
      );
    }
    return await this.repository.update(id, data);
  }

  async setContent(file, type) {
    if ([2, 3, 7].indexOf(type) >= 0) {
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
