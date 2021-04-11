import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const LESSON_PERMISSION_TYPES_PROVIDER =
  'LESSON_PERMISSION_TYPES_REPOSITORY';
export const LESSON_PERMISSION_TYPES_ENTITY = 'lesson_permission_types';

export enum TypesLessonPermissions {
  PUBLIC = 1,
  ORGANIZATION = 2,
  PRIVATE = 3,
}

export class CreateLessonPermissionTypesDto extends CreateBaseDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
}

export class UpdateLessonPermissionTypesDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
}
