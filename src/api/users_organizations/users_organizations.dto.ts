import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const USERS_ORGANIZATIONS_PROVIDER = 'USERS_ORGANIZATIONS_REPOSITORY';
export const USERS_ORGANIZATIONS_ENTITY = 'users_organizations';

export class CreateUsersOrganizationsDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly user_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly organization_id: number;
}

export class UpdateUsersOrganizationsDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly user_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly organization_id?: number;
}
