import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export const COURSE_USERS_PROVIDER = 'COURSE_USERS_REPOSITORY';
export const COURSE_USERS_ENTITY = 'course_users';
export class CreateCourseUsersDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly course: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly user: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly transaction_status?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly enrollment_status?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly enrollment_type?: number;
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
  readonly ref_transaction?: string;
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
  readonly private_inscription?: boolean;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly favorite?: boolean;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly downloaded?: boolean;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly paid_value?: number;
}

export class UpdateCourseUsersDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly course?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly user?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly transaction_status?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly enrollment_status?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly enrollment_type?: number;
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
  readonly ref_transaction?: string;
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
  readonly private_inscription?: boolean;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly favorite?: boolean;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly downloaded?: boolean;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly paid_value?: number;
}
