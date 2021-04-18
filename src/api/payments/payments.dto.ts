import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
export const PAYMENTS_PROVIDER = 'PAYMENTS_REPOSITORY';
export const PAYMENTS_ENTITY = 'payments';

export class CreatePaymentsDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly payment_state_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly collection_type_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly currency_type_id: number;
  @ApiProperty({ required: false }) @IsNumber() @IsOptional() readonly organization_id?: number;
  @ApiProperty({ required: false }) @IsString() @IsOptional() readonly collection_file?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() readonly transaction_code?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() readonly transaction_reference?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() readonly transaction_date?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() readonly paid_date?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() readonly processed_date?: string;
  @ApiProperty({ required: false }) @IsNumber() @IsOptional() quantity?: number;
  @ApiProperty({ required: false }) @IsString() @IsOptional() readonly description?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() readonly bank?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() readonly snapshot?: string;
}
export class UpdatePaymentsDto extends UpdateBaseDto {
  @ApiProperty({ required: false }) @IsNumber() @IsNotEmpty() readonly payment_state_id?: number;
  @ApiProperty({ required: false }) @IsNumber() @IsNotEmpty() readonly collection_type_id?: number;
  @ApiProperty({ required: false }) @IsNumber() @IsNotEmpty() readonly currency_type_id?: number;
  @ApiProperty({ required: false }) @IsNumber() @IsOptional() readonly organization_id?: number;
  @ApiProperty({ required: false }) @IsString() @IsOptional() readonly collection_file?: string;
  @ApiProperty({ required: false }) @IsString() @IsNotEmpty() readonly transaction_code?: string;
  @ApiProperty({ required: false }) @IsString() @IsNotEmpty() readonly transaction_reference?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() readonly transaction_date?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() readonly paid_date?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() readonly processed_date?: string;
  @ApiProperty({ required: false }) @IsNumber() @IsOptional() quantity?: number;
  @ApiProperty({ required: false }) @IsString() @IsOptional() readonly description?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() readonly bank?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() readonly snapshot?: string;
}

export class AddExternalCollectionDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly currency_type_id: number;
  @ApiProperty({ required: false }) @IsString() @IsOptional() readonly collection_file?: string;
  @ApiProperty({ required: false }) @IsNumber() @IsOptional() readonly organization_id?: number;
  @ApiProperty({ required: false }) @IsString() @IsOptional() readonly transaction_reference?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() readonly transaction_code?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() readonly transaction_date?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() readonly paid_date?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() readonly processed_date?: string;
  @ApiProperty({ required: false }) @IsNumber() @IsOptional() readonly quantity?: number;
  @ApiProperty({ required: false }) @IsString() @IsOptional() readonly description?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() readonly bank?: string;
  @ApiProperty({ required: false }) @IsString() @IsOptional() readonly snapshot?: string;

  @ApiProperty() @IsNumber() @IsNotEmpty() readonly user_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly program_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() credits: number;
}
