import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const LESSON_SCORMS_PROVIDER = 'LESSON_SCORMS_REPOSITORY';
export const LESSON_SCORMS_ENTITY = 'lesson_scorms';

export class CreateLessonScormsDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly lesson: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly content: string;
}

export class UpdateLessonScormsDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly lesson?: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly content?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly identifier?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly title?: string;
}
