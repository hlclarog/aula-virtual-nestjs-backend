import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const TENANCIES_PROVIDER = 'TENANCIES_REPOSITORY';
export const TENANCIES_ENTITY = 'tenancies';
export enum TENANCY_STATUS_ENUM {
  StartProcessing = 1,
}
export class CreateTenanciesDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly client_id: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  tenancy_status_id?: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly name: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly alias: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly database_name: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly server_address: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly administrator: string;
  @ApiProperty() @IsString() @IsNotEmpty() password: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly schema: string;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly front_server_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly back_server_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly plan_id: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly activation_time?: string;
}

export class CreateKeysOauthServerDto extends CreateBaseDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly name: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly scope: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly grants: string[];
}

export class UpdateTenanciesDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly client_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly tenancy_status_id?: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly name?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly alias?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly database_name?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly server_address?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly administrator?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly password?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly schema?: string;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly front_server_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly back_server_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly plan_id?: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly activation_time?: string;
}
