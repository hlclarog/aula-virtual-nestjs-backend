import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../../base/base.dto';

export const USERS_ROLES_PROVIDER = 'USERS_ROLES_REPOSITORY';
export const USERS_ROLES_ENTITY = 'users_roles';

export class CreateUsersRolesDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() user_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() rol_id: number;
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  readonly default?: boolean;
}

export class UpdateUsersRolesDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly user_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly rol_id?: number;
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  readonly default?: boolean;
}
