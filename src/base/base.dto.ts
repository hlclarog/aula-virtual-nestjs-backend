import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateBaseDto {
  @ApiProperty() @IsBoolean() @IsNotEmpty() readonly active: boolean;
}
export class UpdateBaseDto {
  @ApiProperty() @IsBoolean() @IsNotEmpty() readonly active: boolean;
}
