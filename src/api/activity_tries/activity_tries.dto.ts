import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { CreateBaseDto } from '../../base/base.dto';

export const ACTIVITY_TRIES_PROVIDER = 'ACTIVITY_TRIES_REPOSITORY';
export const ACTIVITY_TRIES_ENTITY = 'activity_tries';

export class SetIntentUserDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly activity_try: number;
  @ApiProperty() @IsBoolean() @IsNotEmpty() readonly passed: boolean;
  @ApiProperty() @IsBoolean() @IsNotEmpty() readonly answer: any;
}
