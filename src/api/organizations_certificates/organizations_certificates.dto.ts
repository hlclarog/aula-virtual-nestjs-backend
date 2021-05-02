import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const ORGANIZATIONS_CERTIFICATES_PROVIDER =
  'ORGANIZATIONS_CERTIFICATES_REPOSITORY';
export const ORGANIZATIONS_CERTIFICATES_ENTITY = 'organizations_certificates';

export class CreateOrganizationsCertificatesDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly organization_id: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly background?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly background_demo?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly content?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly sign_text?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly sign_picture?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly sign_position?: string;
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  readonly selected?: boolean;
}

export class UpdateOrganizationsCertificatesDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly background?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly background_demo?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly content?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly sign_text?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly sign_picture?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly sign_position?: string;
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  readonly selected?: boolean;
}
