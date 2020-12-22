import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../../base/base.dto';

export const ROLES_PROVIDER = 'ROLES_REPOSITORY';
export const ROLES_ENTITY = 'roles';

export class CreateRolesDto extends CreateBaseDto {
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
  roles_permissions: number[];
}

export class UpdateRolesDto extends UpdateBaseDto {
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
  roles_permissions?: number[];
}
