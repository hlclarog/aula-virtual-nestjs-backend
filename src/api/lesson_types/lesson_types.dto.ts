import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const LESSON_TYPES_PROVIDER = 'LESSON_TYPES_REPOSITORY';
export const LESSON_TYPES_ENTITY = 'lesson_types';

export class CreateLessonTypesDto extends CreateBaseDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
}

export class UpdateLessonTypesDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
}
