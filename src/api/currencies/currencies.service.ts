import { Inject, Injectable } from '@nestjs/common';
import { CreateCurrencyDto, CURRENCY_PROVIDER, UpdateCurrencyDto } from './currency.dto';
import { BaseService } from '../../base/base.service';
import { Currencies } from './currency.entity';
import { BaseRepo } from '../../base/base.repository';

@Injectable()
export class CurrenciesService extends BaseService<
  Currencies,
  CreateCurrencyDto,
  UpdateCurrencyDto
> {
  @Inject(CURRENCY_PROVIDER) repository: BaseRepo<Currencies>;
}
