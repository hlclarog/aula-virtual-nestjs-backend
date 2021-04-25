import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export const COURSE_PAYMENTS_PROVIDER = 'COURSE_PAYMENTS_REPOSITORY';
export const COURSE_PAYMENTS_ENTITY = 'course_payments';
export class CreateCoursePaymentsDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly course_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly user_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly payment_id: number;
  @ApiProperty({ required: false }) @IsString() @IsNotEmpty() readonly description?: string;
}
export class UpdateCoursePaymentsDto extends UpdateBaseDto {
  @ApiProperty({ required: false }) @IsNumber() @IsOptional() readonly course_id?: number;
  @ApiProperty({ required: false }) @IsNumber() @IsOptional() readonly user_id?: number;
  @ApiProperty({ required: false }) @IsNumber() @IsOptional() readonly payment_id?: number;
  @ApiProperty({ required: false }) @IsOptional() @IsOptional() readonly description?: string;
}
