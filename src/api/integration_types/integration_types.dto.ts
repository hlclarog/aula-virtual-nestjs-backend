import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const INTEGRATION_TYPES_PROVIDER = 'INTEGRATION_TYPES_REPOSITORY';
export const INTEGRATION_TYPES_ENTITY = 'integration_types';

export class CreateIntegrationTypesDto extends CreateBaseDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly type: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly callback?: string;
}

export class UpdateIntegrationTypesDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly type?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly callback?: string;
}
