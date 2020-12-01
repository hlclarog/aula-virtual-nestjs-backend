import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export const USER_PROVIDER = 'USER_REPOSITORY';

export class CreateUserDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly full_name: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
