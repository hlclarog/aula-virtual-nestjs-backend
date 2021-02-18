import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const TENANCY_LANGUAGES_PROVIDER = 'TENANCY_LANGUAGES_REPOSITORY';
export const TENANCY_LANGUAGES_ENTITY = 'tenancy_languages';

export class CreateTenancyLanguagesDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly tenancy_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly language_id: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
}

export class UpdateTenancyLanguagesDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly tenancy_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly language_id?: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
}
