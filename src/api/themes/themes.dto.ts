import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const THEMES_PROVIDER = 'THEMES_REPOSITORY';
export const THEMES_ENTITY = 'themes';

export const THEME_DEFAULT_ID = 1;

export class CreateThemesDto extends CreateBaseDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly code: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly observation?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  picture?: string;
}

export class UpdateThemesDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly code?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly observation?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  picture?: string;
}
