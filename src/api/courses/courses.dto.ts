import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export const COURSES_PROVIDER = 'COURSES_REPOSITORY';
export const COURSE_ENTITY = 'courses';

export enum COURSES_PERMISSIONS {
  CREATE = 'create-courses',
  UPDATE = 'update-courses',
  DELETE = 'delete-courses',
  LIST = 'list-courses',
  MANAGER = 'management-courses',
}

export class CreateCourseDto extends CreateBaseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly code?: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly name: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly short_name: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly picture: string;
  @ApiProperty() @IsBoolean() @IsNotEmpty() readonly free: boolean;
  @ApiProperty() @IsBoolean() @IsNotEmpty() readonly certifiable: boolean;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly organization: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly user: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly course_status: number;
  @ApiProperty({
    type: 'number',
    isArray: true,
    example: [1, 2, 3],
    required: false,
  })
  @IsArray()
  @IsOptional()
  interest_areas?: number[];
}

export class CreateCourseByTeacherDto extends CreateBaseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly code?: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly name: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly short_name?: string;
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  readonly free?: boolean;
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  readonly certifiable?: boolean;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly organization?: number;
  @ApiProperty({ required: false }) @IsNumber() @IsOptional() user?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly course_status?: number;
  @ApiProperty({
    type: 'number',
    isArray: true,
    example: [1, 2, 3],
    required: false,
  })
  @IsArray()
  @IsOptional()
  interest_areas?: number[];
}

export class UpdateCourseDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly name?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly picture?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly short_name?: string;
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  readonly free?: boolean;
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  readonly certifiable?: boolean;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly organization?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  user?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly course_status?: number;
  @ApiProperty({
    type: 'number',
    isArray: true,
    example: [1, 2, 3],
    required: false,
  })
  @IsArray()
  @IsOptional()
  interest_areas?: number[];
}

export class SubscribeCourseStudentDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly course: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly begin_date: string;
}
