import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export const EMAIL_ACTIVITIES_PROVIDER = 'EMAIL_ACTIVITIES_REPOSITORY';
export const EMAIL_ACTIVITIES_ENTITY = 'email_activities';

export class CreateEmailActivitiesDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly description: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly observations: string;
}

export class UpdateEmailActivitiesDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly observations?: string;
}
