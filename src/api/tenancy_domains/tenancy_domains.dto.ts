import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const TENANCY_DOMAINS_PROVIDER = 'TENANCY_DOMAINS_REPOSITORY';
export const TENANCY_DOMAINS_ENTITY = 'tenancy_domains';

export class CreateTenancyDomainsDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly tenancy: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
}

export class UpdateTenancyDomainsDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly tenancy?: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
}
