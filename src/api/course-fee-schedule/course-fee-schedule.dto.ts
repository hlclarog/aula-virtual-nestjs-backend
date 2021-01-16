import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDateString,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export const COURSE_FEE_SCHEDULE_PROVIDER = 'COURSE_FEE_SCHEDULE_REPOSITORY';
export const COURSE_FEE_SCHEDULE_ENTITY = 'course_fee_schedules';

export class CreateCourseFeeScheduleDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly currency: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly course: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly begin: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly end?: string;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly course_val: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly certificate_val: number;
}

export class UpdateCourseFeeScheduleDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly currency: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly course: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly begin: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly end?: string;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly course_val: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly certificate_val: number;
}
