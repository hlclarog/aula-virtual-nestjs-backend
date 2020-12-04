import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export const TENANCY_EMAILS_PROVIDER = 'TENANCY_EMAILS_REPOSITORY';
export const TENANCY_EMAILS_ENTITY = 'tenancy_emails';

export class CreateTenancyEmailsDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly tenancy: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly email_address: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly email_name: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly username: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly password: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly hostname: string;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly port_number: number;
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  readonly authentication_required: boolean;
}

export class UpdateTenancyEmailsDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly tenancy?: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly email_address?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly email_name?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly username?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly password?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly hostname?: string;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly port_number?: number;
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  readonly authentication_required?: boolean;
}
