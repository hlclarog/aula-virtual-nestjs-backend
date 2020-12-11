import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export const ROLES_PERMISSIONS_PROVIDER = 'ROLES_PERMISSIONS_REPOSITORY';
export const ROLES_PERMISSIONS_ENTITY = 'roles_permissions';

export class CreateRolesPermissionsDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() rol: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() permission: number;
}

export class UpdateRolesPermissionsDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly rol?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly permission?: number;
}
