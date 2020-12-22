import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from './../../../base/base.dto';

export const CONNECTION_TYPES_PROVIDER = 'CONNECTION_TYPES_REPOSITORY';
export const CONNECTION_TYPES_ENTITY = 'connection_types';

export class CreateConnectionTypesDto extends CreateBaseDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
}

export class UpdateConnectionTypesDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
}
