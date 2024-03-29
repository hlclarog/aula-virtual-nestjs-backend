import { ApiProperty } from '@nestjs/swagger';
import {
  IsIP,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../../base/base.dto';

export const SERVERS_PROVIDER = 'SERVERS_REPOSITORY';
export const SERVERS_ENTITY = 'servers';

export class CreateServersDto extends CreateBaseDto {
  @ApiProperty() @IsString() @IsIP() readonly ip_public: string;
  @ApiProperty() @IsString() @IsIP() readonly ip_address: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly name_server: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly user: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly pass: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly ssh_key: string;
  @ApiProperty() @IsNumber() @IsNumber() readonly server_type_id: number;
  @ApiProperty() @IsNumber() @IsNumber() readonly connection_type_id: number;
}

export class UpdateServersDto extends UpdateBaseDto {
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
  readonly server_type_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly connection_type_id?: number;
}
