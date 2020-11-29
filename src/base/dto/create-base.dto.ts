import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export const BASE_PROVIDER = 'BASE_REPOSITORY';

export class CreateBaseDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly name: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
  @ApiProperty() @IsInt() @IsNotEmpty() readonly state: number;
  @ApiProperty() @IsBoolean() @IsNotEmpty() readonly active: boolean;
}

export class UpdateBaseDto extends PartialType(CreateBaseDto) {}
