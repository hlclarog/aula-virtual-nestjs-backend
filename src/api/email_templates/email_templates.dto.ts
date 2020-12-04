import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export const EMAIL_TEMPLATES_PROVIDER = 'EMAIL_TEMPLATES_REPOSITORY';
export const EMAIL_TEMPLATES_ENTITY = 'email_templates';

export class CreateEmailTemplatesDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly language: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly observations: string;
}

export class UpdateEmailTemplatesDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly language?: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly observations?: string;
}
