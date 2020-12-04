import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export const TENANCY_LANGUAGES_PROVIDER = 'TENANCY_LANGUAGES_REPOSITORY';
export const TENANCY_LANGUAGES_ENTITY = 'tenancy_languages';

export class CreateTenancyLanguagesDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly tenancy: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly language: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
}

export class UpdateTenancyLanguagesDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly tenancy?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly language?: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
}
