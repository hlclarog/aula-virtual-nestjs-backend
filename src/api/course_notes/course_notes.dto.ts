import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export const COURSE_NOTES_PROVIDER = 'COURSE_NOTES_REPOSITORY';
export const COURSE_NOTES_ENTITY = 'course_notes';

export class CreateCourseNotesDto extends CreateBaseDto {
  user_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly course_id: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly content?: string;
}

export class UpdateCourseNotesDto extends UpdateBaseDto {
  user_id: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly content?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
}
