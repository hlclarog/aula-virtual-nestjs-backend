import { HttpService, Inject, Injectable } from '@nestjs/common';
import {
  CreateTenanciesDto,
  UpdateTenanciesDto,
  TENANCIES_PROVIDER,
} from './tenancies.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { Tenancies } from './tenancies.entity';

@Injectable()
export class TenanciesService extends BaseService<
  Tenancies,
  CreateTenanciesDto,
  UpdateTenanciesDto
> {
  @Inject(TENANCIES_PROVIDER) repository: BaseRepo<Tenancies>;

  constructor(private httpService: HttpService) {
    super();
  }

  async create(createDto: CreateTenanciesDto): Promise<any> {
    // const dataSave = await this.repository.save(createDto);
    const domain = 'omarenco.com';
    // const body = [
    //   {
    //     data: '3.131.64.94',
    //     name: createDto.alias,
    //     port: 80,
    //     priority: 0,
    //     service: 'null',
    //     protocol: 'null',
    //     ttl: 3600,
    //     type: 'A',
    //     weight: 0,
    //   },
    // ];
    // const result = await this.httpService
    //   .patch(`https://api.godaddy.com/v1/domains/${domain}/records`, body, {headers: {Authorization: 'sso-key AEYnEcMWtab_5Rgxv2XunLRvDYqbbyBvjz:Sbx4S8nDPoGYyUWRGBjsL4'}})
    //   .toPromise();

    const resultJenkins = await this.httpService.post(`http://omarenco.com:8080/buildByToken/buildWithParameters?job=tenancyBuild&token=11d16d9542d9b22edaa51883f014e600a8&alias=${createDto.alias}.${domain}`, {}).toPromise();
    console.log(resultJenkins);
    return resultJenkins.data;
  }
}
