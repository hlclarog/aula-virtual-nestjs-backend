import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const LESSON_DETAILS_PROVIDER = 'LESSON_DETAILS_REPOSITORY';
export const LESSON_DETAILS_ENTITY = 'lesson_comment_reactions';
export enum LESSON_CONTENT_TYPES {
  TEXT = 'text',
  IMAGE = 'image',
}

export class AddCommentReactionDto extends CreateBaseDto {
  user_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly lesson_comment_id: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly reaction_type: string;
}

export class DeleteCommentReactionDto extends UpdateBaseDto {
  user_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly lesson_comment_id: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly reaction_type: string;
}
