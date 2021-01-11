import { PartialType } from '@nestjs/mapped-types';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
export const CURRENCY_PROVIDER = 'CURRENCY_REPOSITORY';
export const CURRENCY_ENTITY = 'currencies';

export class CreateCurrencyDto extends CreateBaseDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly code: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly symbol: string;
  @ApiProperty({ type: Number }) @IsNotEmpty() readonly decimals: number;
}
export class UpdateCurrencyDto extends UpdateBaseDto {
  @ApiProperty({ required: false, type: Number }) readonly description?: string;
  @ApiProperty({ type: String }) readonly code?: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly symbol?: string;
  @ApiProperty({ type: Number }) @IsNotEmpty() readonly decimals?: number;
}
