import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateBaseDto } from '../../base/base.dto';

export const ACTIVITY_TRIES_PROVIDER = 'ACTIVITY_TRIES_REPOSITORY';
export const ACTIVITY_TRIES_ENTITY = 'activity_tries';

export class CreateIntentUserDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly lesson_activity: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly answer: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly date: string;
}
