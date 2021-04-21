import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export const COURSE_UNITS_PROVIDER = 'COURSE_UNITS_REPOSITORY';
export const COURSE_UNITS_ENTITY = 'lessons';

export enum LESSON_PERMISSIONS {
  GET_ALL_PROGRESS = 'get-all-progress-students',
}

export class CreateLessonsDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly lesson_type_id: number;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly lesson_permission_type_id: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly name: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly video_url?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly content?: string;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly min_progress?: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly duration: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly suggested_weeks: number;
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  readonly visible?: boolean;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  course_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  course_unit_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  order?: number;
  user_id: number;
}

export class UpdateLessonsDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly lesson_type_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly lesson_permission_type_id?: number;
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
  readonly video_url?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly content?: string;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly min_progress?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly duration?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly suggested_weeks?: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly max_due_date?: string;
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  readonly delivery_late?: boolean;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly date_type_id?: number;
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  readonly visible?: boolean;
}

export class CopyLessonsDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly course_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly course_unit_id: number;
  @ApiProperty({
    type: 'number',
    isArray: true,
    example: [1, 2, 3],
  })
  @IsArray()
  @IsNotEmpty()
  readonly lessons_id: number[];
}

export class FindLessonForStudentDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly lesson_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly course_id?: number;
  user_id: number;
}
