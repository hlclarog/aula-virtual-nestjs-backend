import { Process, Processor } from '@nestjs/bull';
import { HttpService, Inject, Logger } from '@nestjs/common';
import { Job } from 'bull';
import { INSTANCE_PROCESS_QUEUE } from './instance_process.dto';
import { DATABASE_MANAGER_PROVIDER } from '../../database/database.dto';
import {
  Connection,
  createConnection,
  getConnectionManager,
  In,
} from 'typeorm';
import { ConfigService } from '../../config/config.service';
import { InstanceProcessLogService } from '../instance_process_log/instance_process_log.service';
import { Users } from '../../api/acl/users/users.entity';
import { TenancyDomains } from '../../api/tenancy_domains/tenancy_domains.entity';
import { Tenancies } from '../../api/tenancies/tenancies.entity';
import { PlanModules } from '../../api/plan_modules/plan_modules.entity';
import { TenancyModules } from '../../api/tenancy_modules/tenancy_modules.entity';
import { Roles } from '../../api/acl/roles/roles.entity';
import { Permissions } from '../../api/acl/permissions/permissions.entity';
import { RolesPermissions } from '../../api/acl/roles_permissions/roles_permissions.entity';
import { UsersRoles } from '../../api/acl/users_roles/users_roles.entity';
import { TenancyConfig } from './../../api/tenancy_config/tenancy_config.entity';

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
      await this.instanceProcessLogService.setStatusRegister({
        tenant: data.schema,
        status_register: true,
      });
      try {
        this.logger.debug('Initial Create Godaddy Subdomain...');
        const body = [
          {
            data: data.front_server.ip_public,
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
      } catch (e) {
        this.logger.error(`Failed to create Godaddy Subdomain ${data.alias}`);
        await this.instanceProcessLogService.setStatusSubdomine({
          tenant: data.schema,
          status_subdomain: false,
        });
        throw new Error(e);
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
        throw new Error(e);
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
        throw new Error(e);
      }

      let con = null;

      try {
        this.logger.debug(`tenant_${data.schema}`);
        const connectionName = `tenant_${data.schema}`;
        const connectionManager = await getConnectionManager();
        if (connectionManager.has(connectionName)) {
          const connection = await connectionManager.get(connectionName);
          con = connection.isConnected ? connection : connection.connect();
        } else {
          con = await createConnection({
            type: 'postgres',
            host: this.config.hostDatabase(),
            port: this.config.portDatabase(),
            username: this.config.userDatabase(),
            password: this.config.passDatabase(),
            database: this.config.nameDatabase(),
            migrationsTableName: 'migrations_registers',
            migrations: [__dirname + '/../../migrations/tenancy/*{.ts,.js}'],
            cli: { migrationsDir: __dirname + '/../../migrations/tenancy' },
            entities: [__dirname + '/../../api/**/*.entity{.ts,.js}'],
            synchronize: false,
            name: `tenant_${data.schema}`,
            schema: data.schema,
          });
        }
      } catch (e) {
        this.logger.debug(`Error Create Connect... tenant_${data.schema}`);
        throw new Error(e);
      }

      try {
        this.logger.debug('Run Migrations...');
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
        throw new Error(e);
      }

      try {
        this.logger.debug('Created Seeders...');
        const planModules = await this.connection
          .getRepository(PlanModules)
          .find({
            where: { plan_id: data.plan_id },
          });
        if (planModules.length) {
          const tenancyModules: Partial<TenancyModules>[] = [];
          planModules.forEach((item) => {
            const tenancyModule: Partial<TenancyModules> = {
              module_id: item.module_id,
              tenancy_id: data.id,
              active: true,
            };
            tenancyModules.push(tenancyModule);
          });
          await con.getRepository(TenancyModules).save(tenancyModules);
          const rol: Partial<Roles>[] = [
            {
              name: 'admin',
              display_name: 'Administrator',
              description: 'System Administrator',
              translate: 'ES',
              active: true,
            },
            {
              name: 'teacher',
              display_name: 'Docente',
              description: 'Role de Docente',
              translate: 'ES',
              active: true,
            },
            {
              name: 'student',
              display_name: 'Estudiante',
              description: 'Role de Estudiante',
              translate: 'ES',
              active: true,
            }
          ];
          const savedRole = await con.getRepository(Roles).save(rol);
          if (savedRole) {
            const moduleIds = tenancyModules.map((f) => f.module_id);
            const permissions: Permissions[] = await this.connection
              .getRepository(Permissions)
              .find({
                where: { module_id: In(moduleIds) },
              });
            if (permissions.length) {
              const rolesPermissions: Partial<RolesPermissions>[] = [];
              permissions.forEach((item) => {
                const rolPermission: Partial<RolesPermissions> = {
                  rol_id: savedRole.id,
                  permission_id: item.id,
                  active: true,
                };
                rolesPermissions.push(rolPermission);
              });
              await con.getRepository(RolesPermissions).save(rolesPermissions);
              const user: Partial<Users> = {
                name: data.name,
                email: data.administrator,
                password: data.password,
                active: true,
              };
              const savedUser = await con.getRepository(Users).save(user);
              if (savedUser) {
                const usersRoles: Partial<UsersRoles> = {
                  user_id: savedUser.id,
                  rol_id: savedRole.id,
                  default: true,
                  active: true,
                };
                await con.getRepository(UsersRoles).save(usersRoles);
              }
            }
          }
        }
        const tenancyDomain: Partial<TenancyDomains> = {
          description: `${data.alias}.${domain}`,
          tenancy_id: data.id,
        };
        await this.connection.getRepository(TenancyDomains).save(tenancyDomain);
        const tenancyConfig: Partial<TenancyConfig> = {
          tenancy_id: data.id,
          title: data.name,
          allow_registration: true,
        };
        await con.getRepository(TenancyConfig).save(tenancyConfig);
        await this.instanceProcessLogService.setStatusSeeders({
          tenant: data.schema,
          status_seeders: true,
        });
        this.logger.debug('End Created Seeders...');
      } catch (e) {
        this.logger.error('Error Add Seeders...');
        await this.instanceProcessLogService.setStatusSeeders({
          tenant: data.schema,
          status_seeders: false,
        });
        throw new Error(e);
      }

      await this.connection
        .getRepository(Tenancies)
        .update(data.id, { tenancy_status_id: 2 });
      this.logger.debug('..::End::..');
    } catch (e) {
      this.logger.error(`Failed to Create Tenancy ${data.alias}`);
      await this.instanceProcessLogService.setStatusRegister({
        tenant: data.schema,
        status_register: false,
      });
      await this.connection
        .getRepository(Tenancies)
        .update(data.id, { tenancy_status_id: 3 });
    }
  }
}
