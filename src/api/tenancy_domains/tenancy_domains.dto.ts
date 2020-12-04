import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export const TENANCY_DOMAINS_PROVIDER = 'TENANCY_DOMAINS_REPOSITORY';
export const TENANCY_DOMAINS_ENTITY = 'tenancy_domains';

export class CreateTenancyDomainsDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly tenancy: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
}

export class UpdateTenancyDomainsDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly tenancy?: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
}
