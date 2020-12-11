import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export const PERMISSIONS_PROVIDER = 'PERMISSIONS_REPOSITORY';
export const PERMISSIONS_ENTITY = 'permissions';

export class CreatePermissionsDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly module: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly name: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly display_name: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
}

export class UpdatePermissionsDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly module?: number;
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
}
