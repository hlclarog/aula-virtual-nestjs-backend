import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const IDENTIFICATION_TYPES_PROVIDER = 'IDENTIFICATION_TYPES_REPOSITORY';
export const IDENTIFICATION_TYPES_ENTITY = 'identification_types';

export class CreateIdentificationTypesDto extends CreateBaseDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
}

export class UpdateIdentificationTypesDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
}
