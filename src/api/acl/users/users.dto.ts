import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../../base/base.dto';

export const USERS_PROVIDER = 'USERS_REPOSITORY';
export const USERS_ENTITY = 'users';

export class CreateUsersDto extends CreateBaseDto {
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
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly rol_default?: number;
}

export class UpdateUsersDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly name?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly lastname?: string;

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

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly rol_default?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly picture?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly phone?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly gender?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly linkeid?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly country?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly state?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly city?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly address?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly zipcode?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly identification_type_id?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly identification?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly welcome_message?: boolean;
}

export class searchByRol {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly idRol: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly text: string;
}
