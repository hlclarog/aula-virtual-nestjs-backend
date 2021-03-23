import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const TENANCY_OAUTH2_CREDENTIALS_PROVIDER =
  'TENANCY_OAUTH2_CREDENTIALS_REPOSITORY';
export const TENANCY_OAUTH2_CREDENTIALS_ENTITY = 'tenancy_oauth2_credentials';

export class CreateTenancyOauth2CredentialsDto extends CreateBaseDto {
  tenancy_id: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly type: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly client_id: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly client_secret?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly callback_url?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly scope?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly private_key?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly public_key?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly callback_url?: string;
}

export class UpdateTenancyOauth2CredentialsDto extends UpdateBaseDto {
  tenancy_id?: number;
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
  readonly client_id?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly client_secret?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly callback_url?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly scope?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly private_key?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly public_key?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly callback_url?: string;
}
