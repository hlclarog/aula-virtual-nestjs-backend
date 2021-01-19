import { CreateBaseDto } from '../../base/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export const PROGRAMS_PROVIDER = 'PROGRAMS_REPOSITORY';
export const PROGRAMS_ENTITY = 'programs';
export class CreateProgramsDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly program_type: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly program_status: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly organization: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly name: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly shortname: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly picture: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly video_url: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly duration: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly email_to: string;
  @ApiProperty() @IsBoolean() @IsNotEmpty() readonly active: boolean;
}
export class UpdateProgramsDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly program_type?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly program_status?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly organization?: number;
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
  @IsString()
  @IsOptional()
  readonly duration?: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly email_to?: string;
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  readonly active?: boolean;
}