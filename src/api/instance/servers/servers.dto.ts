import { ApiProperty } from '@nestjs/swagger';
import {
  IsIP,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export const SERVERS_PROVIDER = 'SERVERS_REPOSITORY';
export const SERVERS_ENTITY = 'servers';

export class CreateServersDto {
  @ApiProperty() @IsString() @IsIP() readonly ip_public: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly name_server: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly user: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly pass: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly ssh_key: string;
  @ApiProperty() @IsString() @IsIP() readonly ip_address: string;
  @ApiProperty() @IsNumber() @IsIP() readonly server_type: number;
  @ApiProperty() @IsNumber() @IsIP() readonly connection_type: number;
}

export class UpdateServersDto {
  @ApiProperty({ required: false })
  @IsIP()
  @IsOptional()
  readonly ip_public?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly name_server?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly user?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly pass?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly ssh_key?: string;
  @ApiProperty({ required: false })
  @IsIP()
  @IsOptional()
  readonly ip_address?: string;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly server_type?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly connection_type?: number;
}
