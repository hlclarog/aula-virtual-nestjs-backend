import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export const CLIENTS_PROVIDER = 'CLIENTS_COLLETION';

export class RegisterClientDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly channel: string;
}
