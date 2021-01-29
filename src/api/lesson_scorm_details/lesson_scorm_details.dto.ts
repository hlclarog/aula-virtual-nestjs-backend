import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const LESSON_SCORM_DETAILS_PROVIDER = 'LESSON_SCORM_DETAILS_REPOSITORY';
export const LESSON_SCORM_DETAILS_ENTITY = 'lesson_scorm_details';

export class CreateLessonScormDetailsDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly lesson_scorm_intent: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly key: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly value: string;
}

export class UpdateLessonScormDetailsDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly lesson_scorm_intent?: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly key?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly value?: string;
}
