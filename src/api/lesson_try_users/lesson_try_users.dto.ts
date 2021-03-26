import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateBaseDto } from '../../base/base.dto';

export const LESSON_TRY_USERS_PROVIDER = 'LESSON_TRY_USERS_REPOSITORY';
export const LESSON_TRY_USERS_ENTITY = 'lesson_try_users';

export class CreateLessonTryUsersDto extends CreateBaseDto {
  user_id?: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly lesson_id: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly begin: string;
}
export class EndLessonTryUsersDto {
  user_id?: number;
  percent?: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly lesson_id: number;
  @ApiProperty() @IsString() @IsNotEmpty() readonly end: string;
}
