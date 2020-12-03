import { Controller } from '@nestjs/common';
import { EmailTypesService } from './email_types.service';
import { CreateEmailTypesDto, UpdateEmailTypesDto } from './email_types.dto';
import { BaseController } from '../../base/base.controller';
import { EmailTypes } from './email_types.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('email_types')
@Controller('/api/email_types')
export class EmailTypesController extends BaseController<
  EmailTypes,
  CreateEmailTypesDto,
  UpdateEmailTypesDto
> {
  constructor(email_typesService: EmailTypesService) {
    super(email_typesService);
  }
}
