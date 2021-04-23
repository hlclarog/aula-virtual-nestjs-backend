import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export const COURSE_TEACHERS_PROVIDER = 'COURSE_TEACHERS_REPOSITORY';
export const COURSE_TEACHERS_ENTITY = 'course_teachers';

export class CreateCourseTeachersDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly course_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly user_id: number;
}

export class UpdateCourseTeachersDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly course_id: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly user_id: number;
}
