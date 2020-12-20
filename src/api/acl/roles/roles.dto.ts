import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export const ROLES_PROVIDER = 'ROLES_REPOSITORY';
export const ROLES_ENTITY = 'roles';

export class CreateRolesDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly name: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly display_name: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
  @ApiProperty({
    type: 'number',
    isArray: true,
    example: [1, 2, 3],
  })
  @IsArray()
  @IsNotEmpty()
  permissions_roles: number[];
}

export class UpdateRolesDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly name?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly display_name?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
  @ApiProperty({
    type: 'number',
    isArray: true,
    example: [1, 2, 3],
    required: false,
  })
  @IsArray()
  @IsOptional()
  permissions_roles?: number[];
}
