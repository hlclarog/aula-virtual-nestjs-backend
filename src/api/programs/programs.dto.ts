import { CreateBaseDto } from '../../base/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export const PROGRAMS_PROVIDER = 'PROGRAMS_REPOSITORY';
export const PROGRAMS_ENTITY = 'programs';
export class CreateProgramsDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly program_type: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly program_status: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly organization: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly name: string;
  @ApiProperty() @IsString() readonly description: string;
  @ApiProperty() @IsString() readonly shortname: string;
  @ApiProperty() @IsString() readonly picture: string;
  @ApiProperty() @IsString() readonly video_url: string;
  @ApiProperty() @IsString() readonly duration: number;
  @ApiProperty() @IsString() readonly email_to: string;
  @ApiProperty() @IsBoolean() readonly active: boolean;
}
export class UpdateProgramsDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly program_type?: number;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly program_status?: number;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  readonly organization?: number;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name?: string;
  @ApiProperty()
  @IsString()
  readonly description?: string;
  @ApiProperty()
  @IsString()
  readonly shortname?: string;
  @ApiProperty()
  @IsString()
  readonly picture?: string;
  @ApiProperty()
  @IsString()
  readonly video_url?: string;
  @ApiProperty()
  @IsString()
  readonly duration?: number;
  @ApiProperty()
  @IsString()
  readonly email_to?: string;
  @ApiProperty()
  @IsBoolean()
  readonly active?: boolean;
}
