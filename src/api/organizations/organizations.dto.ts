import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const ORGANIZATIONS_PROVIDER = 'ORGANIZATIONS_REPOSITORY';
export const ORGANIZATIONS_ENTITY = 'organizations';

export class CreateOrganizationsDto extends CreateBaseDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly name: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly short_name: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly code: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly primary_color: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly secondary_color: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly tertiary_color: string;
}

export class UpdateOrganizationsDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly name?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly short_name?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly code?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly primary_color?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly secondary_color?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly tertiary_color?: string;
}
