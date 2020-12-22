import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const LANGUAGES_PROVIDER = 'LANGUAGES_REPOSITORY';
export const LANGUAGES_ENTITY = 'languages';

export class CreateLanguagesDto extends CreateBaseDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly code: string;
}

export class UpdateLanguagesDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly code?: string;
}
