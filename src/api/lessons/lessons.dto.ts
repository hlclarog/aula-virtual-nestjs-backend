import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export const COURSE_UNITS_PROVIDER = 'COURSE_UNITS_REPOSITORY';
export const COURSE_UNITS_ENTITY = 'lessons';

export class CreateLessonsDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly course: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly lesson_type: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly course_unit: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly name: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly video_url: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly content: string;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly min_progress: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly order: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly duration: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly suggested_weeks: number;
  @ApiProperty() @IsBoolean() @IsNotEmpty() readonly visible: boolean;
}

export class UpdateLessonsDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly course?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly lesson_type?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly course_unit?: number;
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
  readonly order?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly duration?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly suggested_weeks?: number;
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  readonly visible?: boolean;
}
