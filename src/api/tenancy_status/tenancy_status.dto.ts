import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const TENANCY_STATUS_PROVIDER = 'TENANCY_STATUS_REPOSITORY';
export const TENANCY_STATUS_ENTITY = 'tenancy_status';
export enum TENANCY_STATUS_ENUM {
  StartProcessing = 1,
}
export class CreateTenancyStatusDto extends CreateBaseDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
}

export class UpdateTenancyStatusDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
}
