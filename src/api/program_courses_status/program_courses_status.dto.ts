import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const PROGRAM_COURSES_STATUS_REPOSITORY =
  'PROGRAM_COURSES_STATUS_PROVIDER';
export const PROGRAM_COURSES_STATUS_ENTITY = 'program_courses_status';

export class CreateProgramCoursesStatusDto extends CreateBaseDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
}

export class UpdateProgramCoursesStatusDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
}
