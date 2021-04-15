import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CreateBaseDto, UpdateBaseDto } from '../../base/base.dto';

export const USER_ORGANIZATIONS_PROVIDER = 'USER_ORGANIZATIONS_REPOSITORY';
export const USER_ORGANIZATIONS_ENTITY = 'user_organizations';

export class CreateUserOrganizationsDto extends CreateBaseDto {
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly user_id: number;
  @ApiProperty() @IsNumber() @IsNotEmpty() readonly organization_id: number;
}

export class UpdateUserOrganizationsDto extends UpdateBaseDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly user_id?: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  readonly organization_id?: number;
}
