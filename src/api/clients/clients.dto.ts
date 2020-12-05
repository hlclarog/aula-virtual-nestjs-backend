import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export const CLIENTS_PROVIDER = 'CLIENTS_REPOSITORY';
export const CLIENTS_ENTITY = 'clients';

export class CreateClientsDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly identification_type: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly name: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly last_name: string;
}

export class UpdateClientsDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly identification_type?: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly name?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly last_name?: string;
}
