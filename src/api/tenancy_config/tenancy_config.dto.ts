import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto } from '../../base/base.dto';

export const TENANCY_CONFIG_PROVIDER = 'TENANCY_CONFIG_REPOSITORY';
export const TENANCY_CONFIG_ENTITY = 'tenancy_config';
export class SetTenancyConfigDto extends CreateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly theme?: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly title: string;
}
