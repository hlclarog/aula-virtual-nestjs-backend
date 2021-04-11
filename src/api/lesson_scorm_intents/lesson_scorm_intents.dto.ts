import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const LESSON_SCORM_INTENTS_PROVIDER = 'LESSON_SCORM_INTENTS_REPOSITORY';
export const LESSON_SCORM_INTENTS_ENTITY = 'lesson_scorm_intents';

export class CreateLessonScormIntentsDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly course_lesson_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly user_id: number;
}

export class UpdateLessonScormIntentsDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly course_lesson_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly user_id?: number;
}
