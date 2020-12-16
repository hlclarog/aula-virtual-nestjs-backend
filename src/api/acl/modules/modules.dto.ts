import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsObject,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export const MODULES_PROVIDER = 'MODULES_REPOSITORY';
export const MODULES_ENTITY = 'modules';

export class CreateModulesDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly parent?: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly name: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly icon: string;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly display_order: number;
  @ApiProperty() @IsBoolean() @IsNotEmpty() readonly show_in_menu: boolean;
  @ApiProperty() @IsObject() @IsNotEmpty() readonly crud: any;
  @ApiProperty() @IsObject() @IsNotEmpty() readonly rules: any;
}

export class UpdateModulesDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly parent?: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly name?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly icon?: string;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly display_order?: number;
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  readonly show_in_menu?: boolean;
  @ApiProperty({ required: false }) @IsObject() @IsOptional() readonly crud?: any;
  @ApiProperty({ required: false })
  @IsObject()
  @IsOptional()
  readonly rules?: any;
}
