import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export const EMAIL_ACTIVITIES_TEMPLATE_PROVIDER =
  'EMAIL_ACTIVITIES_TEMPLATE_REPOSITORY';
export const EMAIL_ACTIVITIES_TEMPLATE_ENTITY = 'email_activities_template';

export class CreateEmailActivitiesTemplateDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly email_template: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly email_activity: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly subject: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly body: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly observations: string;
}

export class UpdateEmailActivitiesTemplateDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly email_template?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly email_activity?: number;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly subject?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly body?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly observations?: string;
}