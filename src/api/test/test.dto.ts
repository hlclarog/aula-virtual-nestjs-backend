import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export const TEST_PROVIDER = 'TEST_REPOSITORY';

export enum TEST_PERMISSIONS {
  CREATE = 'create-users',
  UPDATE = 'update-users',
  DELETE = 'delete-users',
  LIST = 'list-users',
}

export class CreateTestDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly name: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
  @ApiProperty() @IsInt() @IsNotEmpty() readonly state: number;
  @ApiProperty() @IsBoolean() @IsNotEmpty() readonly active: boolean;
}

export class UpdateTestDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly name: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description: string;
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  readonly state: number;
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  readonly active: boolean;
}
