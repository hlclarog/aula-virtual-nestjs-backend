import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export const LANGUAGES_PROVIDER = 'LANGUAGES_REPOSITORY';
export const LANGUAGES_ENTITY = 'languages';

export class CreateLanguagesDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly code: string;
}

export class UpdateLanguagesDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly code?: string;
}
