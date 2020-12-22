import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export const CONNECTION_TYPES_PROVIDER = 'CONNECTION_TYPES_REPOSITORY';
export const CONNECTION_TYPES_ENTITY = 'connection_types';

export class CreateConnectionTypesDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
}

export class UpdateConnectionTypesDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
}
