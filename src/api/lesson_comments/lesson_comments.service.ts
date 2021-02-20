import { Inject, Injectable } from '@nestjs/common';
import {
  CreateLessonCommentsDto,
  UpdateLessonCommentsDto,
  LESSON_DETAILS_PROVIDER,
  LESSON_CONTENT_TYPES,
} from './lesson_comments.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { LessonComments } from './lesson_comments.entity';
import { AwsService } from './../../aws/aws.service';
import { typeFilesAwsNames } from './../../aws/aws.dto';
import * as shortid from 'shortid';

@Injectable()
export class LessonCommentsService extends BaseService<
  LessonComments,
  CreateLessonCommentsDto,
  UpdateLessonCommentsDto
> {
  @Inject(LESSON_DETAILS_PROVIDER) repository: BaseRepo<LessonComments>;

  constructor(private awsService: AwsService) {
    super();
  }

  async findAll(): Promise<any> {
    const data = await this.repository
      .createQueryBuilder('lesson_comments')
      .select([
        'lesson_comments.id',
        'lesson_comments.lesson_id',
        'lesson_comments.user_id',
        'lesson_comments.comment_answer_id',
        'lesson_comments.comment',
        'lesson_comments.content_type',
        'lesson_comments.content',
        'lesson_comments.date',
      ])
      .getMany();
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (item.content_type == LESSON_CONTENT_TYPES.IMAGE && item.content) {
        const content = item.content;
        item.content = await this.awsService.getFile(content);
      }
    }
    return data;
  }

  async findOne(id: number): Promise<any> {
    const comment = await this.repository
      .createQueryBuilder('lesson_comments')
      .select([
        'lesson_comments.id',
        'lesson_comments.lesson_id',
        'lesson_comments.user_id',
        'lesson_comments.comment_answer_id',
        'lesson_comments.comment',
        'lesson_comments.content_type',
        'lesson_comments.content',
        'lesson_comments.date',
      ])
      .where('id = :id', { id: id })
      .getOneOrFail();
    if (comment.content_type == LESSON_CONTENT_TYPES.IMAGE && comment.content) {
      const content = comment.content;
      comment.content = await this.awsService.getFile(content);
    }
    return comment;
  }

  async getByLesson(id: number): Promise<any> {
    const data = await this.repository
      .createQueryBuilder('lesson_comments')
      .select([
        'lesson_comments.id',
        'lesson_comments.lesson_id',
        'lesson_comments.user_id',
        'lesson_comments.comment_answer_id',
        'lesson_comments.comment',
        'lesson_comments.content_type',
        'lesson_comments.content',
        'lesson_comments.date',
      ])
      .where('lesson_id = :id', { id: id })
      .getMany();
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (item.content_type == LESSON_CONTENT_TYPES.IMAGE && item.content) {
        const content = item.content;
        item.content = await this.awsService.getFile(content);
      }
    }
    return data;
  }

  async create(createDto: CreateLessonCommentsDto) {
    const data: any = Object.assign({}, createDto);
    if (
      createDto.content_type == LESSON_CONTENT_TYPES.IMAGE &&
      createDto.content
    ) {
      data.content = await this.setContent(createDto.content);
    }
    const dataNew = await this.repository.save(data);
    return dataNew;
  }

  async update(id: number, updateDto: UpdateLessonCommentsDto) {
    const data: any = Object.assign({}, updateDto);
    if (updateDto.content) {
      data.content = await this.setContent(updateDto.content);
    }
    return await this.repository.update(id, data);
  }

  async setContent(file) {
    const result = await this.awsService.saveFile({
      file,
      name: shortid.generate(),
      type: typeFilesAwsNames.lesson_comments_files,
    });
    return result.Key;
  }
}
