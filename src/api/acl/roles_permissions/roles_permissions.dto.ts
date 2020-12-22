import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../../base/base.dto';

export const ROLES_PERMISSIONS_PROVIDER = 'ROLES_PERMISSIONS_REPOSITORY';
export const ROLES_PERMISSIONS_ENTITY = 'roles_permissions';

export class CreateRolesPermissionsDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() rol: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() permission: number;
}

export class UpdateRolesPermissionsDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly rol?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly permission?: number;
}
