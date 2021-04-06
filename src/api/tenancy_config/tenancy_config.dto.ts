import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto } from '../../base/base.dto';

export const TENANCY_CONFIG_PROVIDER = 'TENANCY_CONFIG_REPOSITORY';
export const TENANCY_CONFIG_ENTITY = 'tenancy_config';
export class SetTenancyConfigDto extends CreateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly theme_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly rol_default_id?: number;
  @ApiProperty() @IsString() @IsOptional() readonly title?: string;
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  readonly allow_registration?: boolean;
  @ApiProperty() @IsString() @IsOptional() readonly web_client_oauth?: string;
  @ApiProperty() @IsString() @IsOptional() readonly short_name?: string;
  @ApiProperty() @IsString() @IsOptional() readonly message_welcome?: string;
  @ApiProperty() @IsString() @IsOptional() image_small?: string;
  @ApiProperty() @IsString() @IsOptional() image_big?: string;
  @ApiProperty() @IsNumber() @IsOptional() initial_points?: number;
  @ApiProperty() @IsNumber() @IsOptional() initial_lives?: number;
  @ApiProperty() @IsNumber() @IsOptional() limit_lives?: number;
  @ApiProperty() @IsString() @IsOptional() image_lives?: string;
  @ApiProperty() @IsString() @IsOptional() image_points?: string;
  @ApiProperty() @IsNumber() @IsOptional() bar_span_days?: number;
  @ApiProperty() @IsNumber() @IsOptional() bar_expected_points?: number;
  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  readonly unenroll_reset?: boolean;
}
