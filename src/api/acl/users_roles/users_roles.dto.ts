import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export const USERS_ROLES_PROVIDER = 'USERS_ROLES_REPOSITORY';
export const USERS_ROLES_ENTITY = 'users_roles';

export class CreateUsersRolesDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() user: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() rol: number;
}

export class UpdateUsersRolesDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly user?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly rol?: number;
}
