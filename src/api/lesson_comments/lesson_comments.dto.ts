import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const LESSON_DETAILS_PROVIDER = 'LESSON_DETAILS_REPOSITORY';
export const LESSON_DETAILS_ENTITY = 'lesson_comments';
export enum LESSON_CONTENT_TYPES {
  TEXT = 'text',
  IMAGE = 'image',
}

export class CreateLessonCommentsDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly course_lesson_id: number;
  user_id: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly comment?: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly content_type: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly content?: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly date: string;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly comment_answer_id?: number;
}

export class UpdateLessonCommentsDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly comment?: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly content_type: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly content?: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly date: string;
}
