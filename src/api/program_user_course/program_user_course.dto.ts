import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
export const PROGRAM_USER_COURSE_PROVIDER = 'PROGRAM_USER_COURSE_REPOSITORY';
export const PROGRAM_USER_COURSE_ENTITY = 'program_users_course';

export class CreateProgramUserCourseDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly program_user_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly course_user_id: number;
  @ApiProperty({ required: false }) @IsNumber() @IsOptional() readonly credits?: number;
  @ApiProperty({ required: false }) @IsBoolean() @IsOptional() readonly homologue?: boolean;
}
export class UpdateProgramUserCourseDto extends UpdateBaseDto {
  @ApiProperty({ required: false }) @IsNumber() @IsOptional() readonly program_user_id?: number;
  @ApiProperty({ required: false }) @IsNumber() @IsOptional() readonly course_user_id?: number;
  @ApiProperty({ required: false }) @IsNumber() @IsOptional() readonly credits?: number;
  @ApiProperty({ required: false }) @IsBoolean() @IsOptional() readonly homologue?: boolean;
}

export class AvailableCreditsDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() user_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() program_id: number;
}
