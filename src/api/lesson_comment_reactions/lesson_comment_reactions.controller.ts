import { Body, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import { LessonCommentReactionsService } from './lesson_comment_reactions.service';
import {
  AddCommentReactionDto,
  DeleteCommentReactionDto,
} from './lesson_comment_reactions.dto';
import { BaseController } from '../../base/base.controller';
import { LessonCommentReactions } from './lesson_comment_reactions.entity';
import { ControllerApi } from '../../utils/decorators/controllers.decorator';
import {
  INFO_USER_PROVIDER,
  InfoUserProvider,
} from './../../utils/providers/info-user.module';

@ControllerApi({ name: 'lesson_comment_reactions' })
export class LessonCommentReactionsController extends BaseController<
  LessonCommentReactions,
  AddCommentReactionDto,
  DeleteCommentReactionDto
> {
  constructor(
    protected lesson_comment_reactionsService: LessonCommentReactionsService,
    @Inject(INFO_USER_PROVIDER) private infoUser: InfoUserProvider,
  ) {
    super(lesson_comment_reactionsService);
  }

  @Get('comment/:id')
  async getByComment(@Param('id') id: number) {
    const result = await this.lesson_comment_reactionsService.getByComment(id);
    return {
      data: result,
    };
  }

  @Post()
  async add(@Body() addDto: AddCommentReactionDto) {
    addDto.user_id = this.infoUser.id;
    return await this.create(addDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.remove(id);
  }
}
