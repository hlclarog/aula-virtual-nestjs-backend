import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const CLIENTS_PROVIDER = 'CLIENTS_REPOSITORY';
export const CLIENTS_ENTITY = 'clients';

export class CreateClientsDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly identification_type: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly name: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly dni: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly agent_name: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly agent_phone: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly agent_email: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly agent_cellphone: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly billing_name: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly billing_phone: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly billing_email: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly billing_cellphone: string;
}

export class UpdateClientsDto extends UpdateBaseDto {
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
  readonly dni?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly agent_name?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly agent_phone?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly agent_email?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly agent_cellphone?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly billing_name?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly billing_phone?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly billing_email?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly billing_cellphone?: string;
}
