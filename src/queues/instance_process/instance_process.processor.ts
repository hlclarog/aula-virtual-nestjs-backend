import { Process, Processor } from '@nestjs/bull';
import { HttpService, Inject, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { INSTANCE_PROCESS_QUEUE } from './instance_process.dto';
import { DATABASE_MANAGER_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';

@Processor(INSTANCE_PROCESS_QUEUE)
export class InstanceProcessProcessor {
  private readonly logger = new Logger(InstanceProcessProcessor.name);

  constructor(
    private httpService: HttpService,
    @Inject(DATABASE_MANAGER_PROVIDER) private connection: Connection,
  ) {}

  @Process('create')
  async createInstanceProcess({ data }: Job) {
    this.logger.debug(`Creating ${data.name} instance...`);
    this.logger.debug('Initial Create Godaddy Subdomain...');

    const domain = 'omarenco.com';
    const body = [
      {
        data: '3.131.64.94',
        name: data.alias,
        port: 80,
        priority: 0,
        service: 'null',
        protocol: 'null',
        ttl: 3600,
        type: 'A',
        weight: 0,
      },
    ];

    const config = {
      headers: {
        Authorization:
          'sso-key AEYnEcMWtab_5Rgxv2XunLRvDYqbbyBvjz:Sbx4S8nDPoGYyUWRGBjsL4',
      },
    };

    const createGodaddySubdomain = await this.httpService
      .patch(
        `https://api.godaddy.com/v1/domains/${domain}/records`,
        body,
        config,
      )
      .toPromise();

    this.logger.debug(
      createGodaddySubdomain.data,
      'Create Godaddy Subdomain...',
    );

    this.logger.debug('Initial Running Job Jenkins...');

    const runningJobJenkins = await this.httpService
      .post(
        `http://omarenco.com:8080/buildByToken/buildWithParameters?job=tenancyBuild&token=11d16d9542d9b22edaa51883f014e600a8&alias=${data.alias}.${domain}`,
        {},
      )
      .toPromise();

    this.logger.debug(runningJobJenkins.data, 'End Running Job Jenkins...');
    this.logger.debug('Initial Create Schema...');
    const resultCreateSchema = await this.connection.query(
      `CREATE SCHEMA ${data.schema}`,
    );
    this.logger.debug(resultCreateSchema);
    this.logger.debug('End Create Schema...');
  }
}
