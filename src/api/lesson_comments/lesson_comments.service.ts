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
import { GatewayService } from './../../utils/services/gateway.service';

@Injectable()
export class LessonCommentsService extends BaseService<
  LessonComments,
  CreateLessonCommentsDto,
  UpdateLessonCommentsDto
> {
  @Inject(LESSON_DETAILS_PROVIDER) repository: BaseRepo<LessonComments>;

  constructor(
    private awsService: AwsService,
    private gatewayService: GatewayService,
  ) {
    super();
  }

  async findAll(): Promise<any> {
    const data = await this.repository
      .createQueryBuilder('lesson_comments')
      .select([
        'lesson_comments.id',
        'lesson_comments.course_lesson_id',
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
        'lesson_comments.course_lesson_id',
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

  async getByCourseLesson(id: number): Promise<any> {
    const data = await this.repository
      .createQueryBuilder('lesson_comments')
      .select([
        'lesson_comments.id',
        'lesson_comments.course_lesson_id',
        'lesson_comments.user_id',
        'lesson_comments.comment_answer_id',
        'lesson_comments.comment',
        'lesson_comments.content_type',
        'lesson_comments.content',
        'lesson_comments.date',
        'user.id',
        'user.name',
        'user.picture',
      ])
      .leftJoin('lesson_comments.user', 'user')
      .where('course_lesson_id = :id', { id: id })
      .getMany();
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      if (item.content_type == LESSON_CONTENT_TYPES.IMAGE && item.content) {
        const content = item.content;
        item.content = await this.awsService.getFile(content);
      }
      if (item.user.picture) {
        item.user.picture = await this.awsService.getFile(item.user.picture);
      }
    }
    return data;
  }

  async getByCourseLessonForStudent(
    course_lesson_id: number,
    student_id: number,
    group?: boolean,
  ): Promise<any> {
    if (group) {
      const data = await this.repository
        .createQueryBuilder('lesson_comments')
        .select([
          'lesson_comments.id',
          'lesson_comments.course_lesson_id',
          'lesson_comments.user_id',
          'lesson_comments.comment',
          'lesson_comments.content_type',
          'lesson_comments.content',
          'lesson_comments.date',
          'user.id',
          'user.name',
          'user.picture',
          'answers.id',
          'answers.course_lesson_id',
          'answers.user_id',
          'answers.comment',
          'answers.content_type',
          'answers.content',
          'answers.date',
          'answers_user.id',
          'answers_user.name',
          'answers_user.picture',
        ])
        .leftJoin('lesson_comments.user', 'user')
        .leftJoin('lesson_comments.answers', 'answers')
        .leftJoin('answers.user', 'answers_user')
        .where(
          'lesson_comments.course_lesson_id = :id AND lesson_comments.comment_answer_id is null',
          {
            id: course_lesson_id,
          },
        )
        .orderBy('lesson_comments.id', 'ASC')
        .orderBy('answers_user.id', 'ASC')
        .getMany();
      for (let i = 0; i < data.length; i++) {
        const item: any = data[i];
        if (item.content_type == LESSON_CONTENT_TYPES.IMAGE && item.content) {
          const content = item.content;
          item.content = await this.awsService.getFile(content);
        }
        if (item.user.picture) {
          item.user.picture = await this.awsService.getFile(item.user.picture);
        }
        for (let i = 0; i < item.answers.length; i++) {
          const element = item.answers[i];
          if (
            element.content_type == LESSON_CONTENT_TYPES.IMAGE &&
            element.content
          ) {
            const subcontent = element.content;
            element.content = await this.awsService.getFile(subcontent);
          }
          if (element.user.picture && element.user.id != item.user.id) {
            element.user.picture = await this.awsService.getFile(
              element.user.picture,
            );
          } else if (element.user.picture && element.user.id == item.user.id) {
            element.user.picture = item.user.picture;
          }
          element.me = element.user.id == student_id;
        }
        item.me = item.user.id == student_id;
      }
      return data;
    } else {
      const data = await this.repository
        .createQueryBuilder('lesson_comments')
        .select([
          'lesson_comments.id',
          'lesson_comments.course_lesson_id',
          'lesson_comments.user_id',
          'lesson_comments.comment',
          'lesson_comments.content_type',
          'lesson_comments.content',
          'lesson_comments.date',
          'user.id',
          'user.name',
          'user.picture',
          'answer.id',
          'answer.course_lesson_id',
          'answer.user_id',
          'answer.comment',
          'answer.content_type',
          'answer.content',
          'answer.date',
          'answer_user.id',
          'answer_user.name',
          'answer_user.picture',
          'reactions.id',
          'reactions.user_id',
          'reactions.reaction_type',
        ])
        .leftJoin('lesson_comments.user', 'user')
        .leftJoin('lesson_comments.comment_answer', 'answer')
        .leftJoin('answer.user', 'answer_user')
        .leftJoin('lesson_comments.lesson_comment_reactions', 'reactions')
        .where('lesson_comments.course_lesson_id = :id', {
          id: course_lesson_id,
        })
        .orderBy('lesson_comments.id', 'ASC')
        .getMany();
      for (let i = 0; i < data.length; i++) {
        const item: any = data[i];
        if (item.content_type == LESSON_CONTENT_TYPES.IMAGE && item.content) {
          const content = item.content;
          item.content = await this.awsService.getFile(content);
        }
        if (item.user.picture) {
          item.user.picture = await this.awsService.getFile(item.user.picture);
        }
        item.me_like = false;
        if (item.lesson_comment_reactions) {
          for (let j = 0; j < item.lesson_comment_reactions.length; j++) {
            const element = item.lesson_comment_reactions[j];
            if (element.user_id == student_id) {
              item.me_like = true;
            }
          }
        }
        delete item.lesson_comment_reactions;
        if (item.comment_answer) {
          const element = item.comment_answer;
          if (
            element.content_type == LESSON_CONTENT_TYPES.IMAGE &&
            element.content
          ) {
            const subcontent = element.content;
            element.content = await this.awsService.getFile(subcontent);
          }
          if (element.user.picture && element.user.id != item.user.id) {
            element.user.picture = await this.awsService.getFile(
              element.user.picture,
            );
          } else if (element.user.picture && element.user.id == item.user.id) {
            element.user.picture = item.user.picture;
          }
          element.me = element.user.id == student_id;
        }
        item.me = item.user.id == student_id;
      }
      return data;
    }
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
    await this.gatewayService.sendCommetLesson(dataNew);
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
