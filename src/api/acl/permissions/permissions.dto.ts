import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../../base/base.dto';

export const PERMISSIONS_PROVIDER = 'PERMISSIONS_REPOSITORY';
export const PERMISSIONS_ENTITY = 'permissions';

export class CreatePermissionsDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly module_id: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly name: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly display_name: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
}

export class UpdatePermissionsDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly module_id?: number;
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
