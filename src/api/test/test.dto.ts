import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export const TEST_PROVIDER = 'TEST_RESPOSITORY';

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
