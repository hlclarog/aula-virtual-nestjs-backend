import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export const SERVER_TYPES_PROVIDER = 'SERVER_TYPES_REPOSITORY';
export const SERVER_TYPES_ENTITY = 'server_types';

export class CreateServerTypesDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
}

export class UpdateServerTypesDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
}
