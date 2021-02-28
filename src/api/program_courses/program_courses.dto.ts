import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const PROGRAM_COURSES_PROVIDER = 'PROGRAM_COURSES_REPOSITORY';
export const PROGRAM_COURSES_ENTITY = 'program_courses';

export class CreateProgramCoursesDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly course_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly program_id: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly transaction_status_id?: number;
}

export class UpdateProgramCoursesDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly course_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly program_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly transaction_status_id?: number;
}
