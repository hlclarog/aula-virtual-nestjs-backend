import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export const TENANCY_STATUS_PROVIDER = 'TENANCY_STATUS_REPOSITORY';
export const TENANCY_STATUS_ENTITY = 'tenancy_status';

export class CreateTenancyStatusDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
}

export class UpdateTenancyStatusDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
}
