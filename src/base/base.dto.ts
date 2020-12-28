import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBaseDto {
  @ApiProperty() @IsBoolean() @IsNotEmpty() readonly active: boolean;
}
export class UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  readonly active?: boolean;
}
