import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export const COURSE_FEE_SCHEDULE_PROVIDER = 'COURSE_FEE_SCHEDULE_REPOSITORY';
export const COURSE_FEE_SCHEDULE_ENTITY = 'course_fee_schedules';

export class CreateCourseFeeScheduleDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly currency_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly course_id: number;
  @ApiProperty() @IsDate() @IsNotEmpty() readonly beging: string;
  @ApiProperty() @IsDate() @IsNotEmpty() readonly end: string;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly course_val: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly certificate_val: number;
}

export class UpdateCourseFeeScheduleDto extends UpdateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly currency_id?: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly course_id?: number;
  @ApiProperty() @IsDate() @IsNotEmpty() readonly beging?: string;
  @ApiProperty() @IsDate() @IsNotEmpty() readonly end?: string;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly course_val?: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly certificate_val?: number;
}
