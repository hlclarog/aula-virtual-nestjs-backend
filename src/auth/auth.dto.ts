import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { CreateUsersDto } from 'src/api/users/users.dto';

export const DEFAULT_TIME_TOKEN_AUTH = '10h';
export const DEFAULT_TIME_TOKEN_REQUEST_PASS_EMAIL = '2h';
export const DEFAULT_TIME_TOKEN_REQUEST_PASS_NUMBER = 300000;
export const MESSAGE_FORBIDDEN = 'EMAIL OR PASSWORD INCORRECT';

export class SignUpDto extends PartialType(CreateUsersDto) {}

export class LoginDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly email: string;
  @ApiProperty() @IsString() @IsNotEmpty() password: string;
}

export class ChangePasswordDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly email: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly password: string;
}

export class RequestPasswordEmailDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly email: string;
}
export class ChangePasswordEmailDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly id: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly password: string;
}

export class RequestPasswordNumberDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly email: string;
}
export class ChangePasswordNumberDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly id: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly token: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly number: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly password: string;
}
