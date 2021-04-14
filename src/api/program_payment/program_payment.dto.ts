import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
export const PROGRAM_PAYMENT_PROVIDER = 'PROGRAM_PAYMENT_REPOSITORY';
export const PROGRAM_PAYMENT_ENTITY = 'program_payment';

export class CreateProgramPaymentDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly program_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly user_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly payment_id: number;
  @ApiProperty({ required: false }) @IsNumber() @IsNotEmpty() readonly credits?: number;
  @ApiProperty({ required: false }) @IsString() @IsNotEmpty() readonly description?: string;
}
export class UpdateProgramPaymentDto extends UpdateBaseDto {
  @ApiProperty({ required: false }) @IsNumber() @IsOptional() readonly program_id?: number;
  @ApiProperty({ required: false }) @IsNumber() @IsOptional() readonly user_id?: number;
  @ApiProperty({ required: false }) @IsNumber() @IsOptional() readonly payment_id?: number;
  @ApiProperty({ required: false }) @IsNumber() @IsOptional() readonly credits?: number;
  @ApiProperty({ required: false }) @IsString() @IsOptional() readonly description?: string;
}
