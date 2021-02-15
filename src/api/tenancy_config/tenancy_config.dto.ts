import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto } from '../../base/base.dto';

export const TENANCY_CONFIG_PROVIDER = 'TENANCY_CONFIG_REPOSITORY';
export const TENANCY_CONFIG_ENTITY = 'tenancy_config';
export class SetTenancyConfigDto extends CreateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly theme?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly rol_default?: number;
  @ApiProperty() @IsString() @IsOptional() readonly title?: string;
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  readonly allow_registration?: boolean;
}
