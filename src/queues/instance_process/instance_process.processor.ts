import { Process, Processor } from '@nestjs/bull';
import { HttpService, Inject, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { INSTANCE_PROCESS_QUEUE } from './instance_process.dto';
import { DATABASE_MANAGER_PROVIDER } from '../../database/database.dto';
import { Connection, createConnection } from 'typeorm';
import { ConfigService } from '../../config/config.service';
import { InstanceProcessLogService } from '../instance_process_log/instance_process_log.service';

@Processor(INSTANCE_PROCESS_QUEUE)
export class InstanceProcessProcessor {
  private readonly logger = new Logger(InstanceProcessProcessor.name);

  constructor(
    private httpService: HttpService,
    @Inject(DATABASE_MANAGER_PROVIDER) private connection: Connection,
    private config: ConfigService,
    private instanceProcessLogService: InstanceProcessLogService,
  ) {}

  @Process('create')
  async createInstanceProcess({ data }: Job) {
    const domain = 'omarenco.com';
    try {
      this.logger.debug(`Creating ${data.name} instance...`);

      await this.instanceProcessLogService.create({
        tenant: data.schema,
      });
      try {
        this.logger.debug('Initial Create Godaddy Subdomain...');
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
        await this.instanceProcessLogService.setStatusSubdomine({
          tenant: data.schema,
          status_subdomain: true,
        });
      } catch (error) {
        this.logger.error(`Failed to create Godaddy Subdomain ${data.alias}`);
        await this.instanceProcessLogService.setStatusSubdomine({
          tenant: data.schema,
          status_subdomain: false,
        });
      }

      try {
        this.logger.debug('Initial Running Job Jenkins...');
        const runningJobJenkins = await this.httpService
          .post(
            `http://omarenco.com:8080/buildByToken/buildWithParameters?job=tenancyBuild&token=11d16d9542d9b22edaa51883f014e600a8&alias=${data.alias}.${domain}`,
            {},
          )
          .toPromise();
        await this.instanceProcessLogService.setStatusVirtualhost({
          tenant: data.schema,
          status_virtualhost: true,
        });
        this.logger.debug(runningJobJenkins.data, 'End Running Job Jenkins...');
      } catch (e) {
        this.logger.error('Error Running Job Jenkins...');
        await this.instanceProcessLogService.setStatusVirtualhost({
          tenant: data.schema,
          status_virtualhost: false,
        });
      }

      try {
        this.logger.debug('Initial Create Schema...');
        await this.connection.createQueryRunner().createSchema(data.schema);
        await this.instanceProcessLogService.setStatusSchema({
          tenant: data.schema,
          status_schema: true,
        });
        this.logger.debug('End Create Schema...');
      } catch (e) {
        this.logger.error('Error Create Schema...');
        await this.instanceProcessLogService.setStatusSchema({
          tenant: data.schema,
          status_schema: false,
        });
      }

      try {
        this.logger.debug('Run Migrations...');
        const con = await createConnection({
          type: 'postgres',
          host: this.config.hostDatabase(),
          port: this.config.portDatabase(),
          username: this.config.userDatabase(),
          password: this.config.passDatabase(),
          database: this.config.nameDatabase(),
          migrationsTableName: 'migrations_registers',
          migrations: [__dirname + '/../../migrations/tenancy/*{.ts,.js}'],
          cli: { migrationsDir: __dirname + '/../../migrations/tenancy' },
          entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
          synchronize: false,
          name: data.schema,
          schema: data.schema,
        });
        await con.runMigrations();
        await this.instanceProcessLogService.setStatusMigrations({
          tenant: data.schema,
          status_migrations: true,
        });
        this.logger.debug('End Migration...');
      } catch (e) {
        this.logger.error('Error Run Migration...');
        await this.instanceProcessLogService.setStatusMigrations({
          tenant: data.schema,
          status_migrations: false,
        });
      }
    } catch (e) {
      this.logger.error(`Failed to Create Tenancy ${data.alias}`);
      await this.instanceProcessLogService.setStatusSubdomine({
        tenant: data.schema,
        status_subdomain: false,
      });
    }
  }
}
