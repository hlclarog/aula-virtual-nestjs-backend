import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const PROGRAM_COURSES_PROVIDER = 'PROGRAM_COURSES_REPOSITORY';
export const PROGRAM_COURSES_ENTITY = 'program_courses';

export class CreateProgramCoursesDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly course: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly program: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly transaction_status?: number;
}

export class UpdateProgramCoursesDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly course?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly program?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly transaction_status?: number;
}
