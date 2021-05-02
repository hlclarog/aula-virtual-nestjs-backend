import { CreateBaseDto } from '../../base/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export const PROGRAMS_PROVIDER = 'PROGRAMS_REPOSITORY';
export const PROGRAMS_ENTITY = 'programs';
export class CreateProgramsDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly program_type_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly program_status_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly organization_id: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly name: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly shortname: string;
  @ApiProperty() @IsString() @IsOptional() readonly picture: string;
  @ApiProperty() @IsString() @IsOptional() readonly video_url: string;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly duration: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly email_to: string;
  @ApiProperty() @IsBoolean() @IsNotEmpty() readonly certifiable: boolean;
  @ApiProperty() @IsBoolean() @IsNotEmpty() readonly by_credit: boolean;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly requirements?: string;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly certifiable_number: number;
  @ApiProperty({
    type: 'number',
    isArray: true,
    example: [1, 2, 3],
    required: false,
  })
  @IsArray()
  @IsOptional()
  interest_areas?: number[];
  @ApiProperty() @IsBoolean() @IsNotEmpty() readonly active: boolean;
}
export class UpdateProgramsDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly program_type_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly program_status_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly organization_id?: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly name?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly shortname?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly picture?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly video_url?: string;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly duration?: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly email_to?: string;
  @ApiProperty({
    type: 'number',
    isArray: true,
    example: [1, 2, 3],
    required: false,
  })
  @IsArray()
  @IsOptional()
  interest_areas?: number[];
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  readonly certifiable?: boolean;
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  readonly by_credit?: boolean;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly requirements?: string;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly certifiable_number?: number;
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  readonly active?: boolean;
}
