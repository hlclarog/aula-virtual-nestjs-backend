import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export const TENANCIES_PROVIDER = 'TENANCIES_REPOSITORY';
export const TENANCIES_ENTITY = 'tenancies';

export class CreateTenanciesDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly identification_type: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly tenancy_status: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly name: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly alias: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly databasename: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly serveraddress: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly administrator: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly password: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly activation_time: string;
}

export class UpdateTenanciesDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly identification_type?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly tenancy_status?: number;
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
  readonly databasename?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly serveraddress?: string;
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
  readonly activation_time?: string;
}
