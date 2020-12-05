import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export const IDENTIFICATION_TYPES_PROVIDER = 'IDENTIFICATION_TYPES_REPOSITORY';
export const IDENTIFICATION_TYPES_ENTITY = 'identification_types';

export class CreateIdentificationTypesDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
}

export class UpdateIdentificationTypesDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
}
