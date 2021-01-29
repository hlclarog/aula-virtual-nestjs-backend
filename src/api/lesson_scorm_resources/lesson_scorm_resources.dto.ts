import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const LESSON_SCORM_RESOURCES_PROVIDER =
  'LESSON_SCORM_RESOURCES_REPOSITORY';
export const LESSON_SCORM_RESOURCES_ENTITY = 'lesson_scorm_resources';

export class CreateLessonScormResourcesDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly lesson_scorm: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly index: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly identifier: string;
}

export class UpdateLessonScormResourcesDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly lesson_scorm?: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly index?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly identifier?: string;
}
