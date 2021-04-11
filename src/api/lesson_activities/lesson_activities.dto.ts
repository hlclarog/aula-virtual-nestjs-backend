import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const LESSON_ACTIVITIES_PROVIDER = 'LESSON_ACTIVITIES_REPOSITORY';
export const LESSON_ACTIVITIES_ENTITY = 'lesson_activities';

export class CreateLessonActivitiesDto extends CreateBaseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly course_lesson_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly activity_type_id: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly detail?: number;
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  readonly visible?: boolean;
}

export class UpdateLessonActivitiesDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly course_lesson_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly activity_type_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly detail?: number;
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  readonly visible?: boolean;
}
