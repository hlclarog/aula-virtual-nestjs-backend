import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const TRANSACTION_STATUS_PROVIDER = 'TRANSACTION_STATUS_REPOSITORY';
export const TRANSACTION_STATUS_ENTITY = 'transaction_status';

export class CreateTransactionStatusDto extends CreateBaseDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
}

export class UpdateTransactionStatusDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
}
