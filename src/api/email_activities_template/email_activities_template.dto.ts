import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const EMAIL_ACTIVITIES_TEMPLATE_PROVIDER =
  'EMAIL_ACTIVITIES_TEMPLATE_REPOSITORY';
export const EMAIL_ACTIVITIES_TEMPLATE_ENTITY = 'email_activities_template';

export class CreateEmailActivitiesTemplateDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly email_template: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly email_activity: number;
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

export class UpdateEmailActivitiesTemplateDto extends UpdateBaseDto {
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
