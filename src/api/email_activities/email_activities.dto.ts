import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const EMAIL_ACTIVITIES_PROVIDER = 'EMAIL_ACTIVITIES_REPOSITORY';
export const EMAIL_ACTIVITIES_ENTITY = 'email_activities';

export class CreateEmailActivitiesDto extends CreateBaseDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly observations: string;
}

export class UpdateEmailActivitiesDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly observations?: string;
}
