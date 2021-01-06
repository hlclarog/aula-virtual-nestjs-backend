import { Inject, Injectable } from '@nestjs/common';
import {
  INFO_TENANCY_PROVIDER,
  InfoTenancyDomain,
} from '../providers/info-tenancy.module';

@Injectable()
export class InfoTenancyService {
  @Inject(INFO_TENANCY_PROVIDER) dataDomain: InfoTenancyDomain;

  public async getData() {
    return this.dataDomain;
  }
}
