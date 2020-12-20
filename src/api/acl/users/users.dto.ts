import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export const USERS_PROVIDER = 'USERS_REPOSITORY';
export const USERS_ENTITY = 'users';

export class CreateUsersDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly name: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly email: string;
  @ApiProperty() @IsString() @IsNotEmpty() password: string;
  @ApiProperty({
    type: 'number',
    isArray: true,
    example: [1, 2, 3],
  })
  @IsArray()
  @IsNotEmpty()
  users_roles: number[];
}

export class UpdateUsersDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly name?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly email?: string;
  @ApiProperty({
    type: 'number',
    isArray: true,
    example: [1, 2, 3],
    required: false,
  })
  @IsArray()
  @IsOptional()
  users_roles?: number[];
}
