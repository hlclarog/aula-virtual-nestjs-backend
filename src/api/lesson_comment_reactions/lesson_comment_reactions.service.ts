import { Inject, Injectable } from '@nestjs/common';
import {
  AddCommentReactionDto,
  DeleteCommentReactionDto,
  LESSON_DETAILS_PROVIDER,
} from './lesson_comment_reactions.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { LessonCommentReactions } from './lesson_comment_reactions.entity';

@Injectable()
export class LessonCommentReactionsService extends BaseService<
  LessonCommentReactions,
  AddCommentReactionDto,
  DeleteCommentReactionDto
> {
  @Inject(LESSON_DETAILS_PROVIDER) repository: BaseRepo<LessonCommentReactions>;

  constructor() {
    super();
  }

  async getByComment(id: number): Promise<any> {
    const data = await this.repository
      .createQueryBuilder('lesson_comment_reactions')
      .select([
        'lesson_comment_reactions.id',
        'lesson_comment_reactions.lesson_comment_id',
        'lesson_comment_reactions.user_id',
        'lesson_comment_reactions.reaction_type',
      ])
      .where('lesson_comment_id = :id', { id: id })
      .getMany();
    return data;
  }

  async save(createDto: AddCommentReactionDto) {
    const result = await this.repository.findOne({
      where: {
        lesson_comment_id: createDto.lesson_comment_id,
        reaction_type: createDto.reaction_type,
        user_id: createDto.user_id,
      },
    });
    if (!result) {
      await this.repository.save(createDto);
    }
    return { liked: true };
  }

  async delete(deleteDto: DeleteCommentReactionDto) {
    const result = await this.repository.findOne({
      where: {
        lesson_comment_id: deleteDto.lesson_comment_id,
        reaction_type: deleteDto.reaction_type,
        user_id: deleteDto.user_id,
      },
    });
    if (result) {
      await this.repository.delete(result.id);
    }
    return { removed: result ? true : false };
  }
}
