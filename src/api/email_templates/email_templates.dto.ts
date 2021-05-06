import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const EMAIL_TEMPLATES_PROVIDER = 'EMAIL_TEMPLATES_REPOSITORY';
export const EMAIL_TEMPLATES_ENTITY = 'email_templates';

export class CreateEmailTemplatesDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly language_id: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly observations: string;
}

export class UpdateEmailTemplatesDto extends UpdateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly language_id: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly observations?: string;
}
