import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const INTEGRATION_TYPES_PROVIDER = 'INTEGRATION_TYPES_REPOSITORY';
export const INTEGRATION_TYPES_ENTITY = 'integration_types';

export class CreateIntegrationTypesDto extends CreateBaseDto {
  tenancy_id: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly callback?: string;
}

export class UpdateIntegrationTypesDto extends UpdateBaseDto {
  tenancy_id?: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly callback?: string;
}
