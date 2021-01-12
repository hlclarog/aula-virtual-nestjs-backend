import { PartialType } from '@nestjs/mapped-types';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export const COURSE_STATUS_PROVIDER = 'COURSE_REPOSITORY';
export const COURSE_STATUS_ENTITY = 'course_status';

export class CreateCourseStatusDto extends CreateBaseDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
}

export class UpdateCourseStatusDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
}
