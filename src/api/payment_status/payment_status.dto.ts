import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export const PAYMENT_STATUS_PROVIDER = 'PAYMENT_STATUS_REPOSITORY';
export const PAYMENT_STATUS_ENTITY = 'payment_status';
export enum PAYMENT_STATUS_ENUM {
  APPROVED = 1,
  REJECTED = 2,
  PENDING = 3,
}
export class CreateCurrencyDto extends CreateBaseDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
}
export class UpdateCurrencyDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
}