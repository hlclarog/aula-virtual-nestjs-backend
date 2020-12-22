import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../../base/base.dto';

export const USERS_ROLES_PROVIDER = 'USERS_ROLES_REPOSITORY';
export const USERS_ROLES_ENTITY = 'users_roles';

export class CreateUsersRolesDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() user: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() rol: number;
}

export class UpdateUsersRolesDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly user?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly rol?: number;
}
