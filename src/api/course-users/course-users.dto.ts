import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export const COURSE_USERS_PROVIDER = 'COURSE_USERS_REPOSITORY';
export const COURSE_USERS_ENTITY = 'course_users';

export enum STATES_COURSE_USER {
  PROGRESS = 1,
  FINALIZATED = 2,
}

export class CreateCourseUsersDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly course_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly user_id: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly enrollment_status_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly enrollment_type_id?: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly begin_date?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly end_date?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly certificate_file?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly certificate_code_validation?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly favorite?: boolean;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly downloaded?: boolean;
}

export class UpdateCourseUsersDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly course_id: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly user_id: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly enrollment_status_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly enrollment_type_id?: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly begin_date?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly end_date?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly certificate_file?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly certificate_code_validation?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly favorite?: boolean;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly downloaded?: boolean;
}
