import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsObject,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../../base/base.dto';

export const MODULES_PROVIDER = 'MODULES_REPOSITORY';
export const MODULES_ENTITY = 'modules';

export class CreateModulesDto extends CreateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly parent_id?: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly name: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly icon: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly path: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly translate: string;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly display_order: number;
  @ApiProperty() @IsBoolean() @IsNotEmpty() readonly show_in_menu: boolean;
  @ApiProperty() @IsObject() @IsNotEmpty() readonly crud: any;
  @ApiProperty() @IsObject() @IsNotEmpty() readonly rules: any;
}

export class UpdateModulesDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly parent_id?: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly name?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly icon?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly path?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly translate?: string;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly display_order?: number;
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  readonly show_in_menu?: boolean;
  @ApiProperty({ required: false })
  @IsObject()
  @IsOptional()
  readonly crud?: any;
  @ApiProperty({ required: false })
  @IsObject()
  @IsOptional()
  readonly rules?: any;
}
