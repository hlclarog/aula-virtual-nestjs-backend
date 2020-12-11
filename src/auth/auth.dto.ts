import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { CreateUsersDto } from 'src/api/acl/users/users.dto';

export const DEFAULT_TIME_TOKEN_AUTH = '10h';
export const DEFAULT_TIME_TOKEN_REQUEST_PASS_EMAIL = '2h';
export const DEFAULT_TIME_TOKEN_REQUEST_PASS_NUMBER = 300000;
export const MESSAGE_FORBIDDEN = 'EMAIL OR PASSWORD INCORRECT';

export class SignUpDto extends PartialType(CreateUsersDto) {}

export class LoginDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly email: string;
  @ApiProperty() @IsString() @IsNotEmpty() password: string;
}

export class RequestPasswordEmailDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly email: string;
}
export class ChangePasswordEmailDto {
  @ApiProperty() @IsString() @IsNotEmpty() readonly access_token: string;
  @ApiProperty() @IsString() @IsNotEmpty() readonly password: string;
}
export class ChangePasswordDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly id: number;
  @ApiProperty() @IsString() @IsNotEmpty() password: string;
}
