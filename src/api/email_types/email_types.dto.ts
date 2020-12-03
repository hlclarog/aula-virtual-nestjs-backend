import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export const EMAIL_TYPES_PROVIDER = 'EMAIL_TYPES_REPOSITORY';
export const EMAIL_TYPES_ENTITY = 'email_types';

export class CreateEmailTypesDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly observations: string;
}

export class UpdateEmailTypesDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly observations?: string;
}
