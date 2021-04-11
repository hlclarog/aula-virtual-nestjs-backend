import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export const COLLECTION_TYPES_PROVIDER = 'COLLECTION_TYPES_REPOSITORY';
export const COLLECTION_TYPES_ENTITY = 'collection_types';

export class CreateCurrencyDto extends CreateBaseDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
}
export class UpdateCurrencyDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
}
