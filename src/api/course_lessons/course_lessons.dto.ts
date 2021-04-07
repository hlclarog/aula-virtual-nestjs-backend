import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export const COURSE_LESSONS_PROVIDER = 'COURSE_LESSONS_REPOSITORY';
export const COURSE_LESSONS_ENTITY = 'course_lessons';

export class CreateCourseLessonsDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly course_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly lesson_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly course_unit_id: number;
}

export class UpdateCourseLessonsDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly course_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly lesson_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly course_unit_id?: number;
}
