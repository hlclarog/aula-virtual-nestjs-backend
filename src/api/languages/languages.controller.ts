import { Controller } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { CreateLanguagesDto, UpdateLanguagesDto } from './languages.dto';
import { BaseController } from '../../base/base.controller';
import { Languages } from './languages.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('languages')
@Controller('/api/languages')
export class LanguagesController extends BaseController<
  Languages,
  CreateLanguagesDto,
  UpdateLanguagesDto
> {
  constructor(languagesService: LanguagesService) {
    super(languagesService);
  }
}
