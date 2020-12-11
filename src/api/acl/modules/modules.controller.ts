import { Controller } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { CreateModulesDto, UpdateModulesDto } from './modules.dto';
import { BaseController } from '../../../base/base.controller';
import { Modules } from './modules.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('modules')
@Controller('/api/modules')
export class ModulesController extends BaseController<
  Modules,
  CreateModulesDto,
  UpdateModulesDto
> {
  constructor(modulesService: ModulesService) {
    super(modulesService);
  }
}
