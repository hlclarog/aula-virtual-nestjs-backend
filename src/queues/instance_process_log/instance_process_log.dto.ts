import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export const INSTANCE_PROCESS_LOG_PROVIDER = 'INSTANCE_PROCESS_LOG_COLLECTION';

export enum EVENTS_PROCESS {
  NEW_TENANCY = 'new_tenancy',
  STATUS_REGISTER = 'status_register',
  STATUS_SUBDOMAIN = 'status_subdomain',
  STATUS_VIRTUALHOST = 'status_virtualhost',
  STATUS_SCHEMA = 'status_schema',
  STATUS_MIGRATIONS = 'status_migrations',
  STATUS_SEEDERS = 'status_seeders',
}

export class SetInstanceProcessDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly tenant: string;
}

export class SetRegisterStatusInstanceProcessDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly tenant: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly status_register: boolean;
}
export class SetSubdomineStatusInstanceProcessDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly tenant: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly status_subdomain: boolean;
}
export class SetVirtualhostStatusInstanceProcessDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly tenant: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly status_virtualhost: boolean;
}
export class SetSchemaStatusInstanceProcessDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly tenant: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly status_schema: boolean;
}
export class SetMigrationsStatusInstanceProcessDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly tenant: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly status_migrations: boolean;
}
export class SetSeedersStatusInstanceProcessDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly tenant: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly status_seeders: boolean;
}
