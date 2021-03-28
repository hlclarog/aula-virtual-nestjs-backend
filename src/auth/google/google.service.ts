import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { deserializeUser, serializeUser } from 'passport';
import { AuthService } from '../auth.service';
import { Connection, createConnection, getConnectionManager } from 'typeorm';
import { ConfigService } from '../../config/config.service';
import { DATABASE_MANAGER_PROVIDER } from '../../database/database.dto';
import { Tenancies } from '../../api/tenancies/tenancies.entity';
import { TenancyOauth2Credentials } from '../../api/tenancy_oauth2_credentials/tenancy_oauth2_credentials.entity';
import { TenancyDomains } from '../../api/tenancy_domains/tenancy_domains.entity';
import { CryptoService } from '../../utils/services/crypto.service';
import { Users } from '../../api/acl/users/users.entity';
import { DEFAULT_TIME_TOKEN_AUTH } from '../auth.dto';
import { THEME_DEFAULT_ID } from '../../api/themes/themes.dto';
import { UsersRoles } from '../../api/acl/users_roles/users_roles.entity';
import { TokenService } from '../../utils/services/token.service';

@Injectable()
export class GoogleService {
  @Inject(DATABASE_MANAGER_PROVIDER) connection: Connection;

  constructor(
    private authService: AuthService,
    private configService: ConfigService,
    private cryptoService: CryptoService,
    private tokenService: TokenService,
  ) {}

  async createStrategy(subDomain) {
    const tenancyDomain = await this.connection
      .getRepository(TenancyDomains)
      .findOne({
        description:
          subDomain === 'localhost' ? subDomain : `${subDomain}.omarenco.com`,
      });

    const tenancy = await this.connection
      .getRepository(Tenancies)
      .findOne({ id: tenancyDomain.tenancy_id });

    let con = null;
    try {
      const connectionName = `tenant_${tenancy.schema}`;
      const connectionManager = await getConnectionManager();
      if (connectionManager.has(connectionName)) {
        const connection = await connectionManager.get(connectionName);
        con = connection.isConnected ? connection : connection.connect();
      } else {
        con = await createConnection({
          type: 'postgres',
          host: this.configService.hostDatabase(),
          port: this.configService.portDatabase(),
          username: this.configService.userDatabase(),
          password: this.configService.passDatabase(),
          database: this.configService.nameDatabase(),
          migrationsTableName: 'migrations_registers',
          migrations: [__dirname + '/../../migrations/tenancy/*{.ts,.js}'],
          cli: { migrationsDir: __dirname + '/../../migrations/tenancy' },
          entities: [__dirname + '/../../api/**/*.entity{.ts,.js}'],
          synchronize: false,
          name: `tenant_${tenancy.schema}`,
          schema: tenancy.schema,
        });
      }
    } catch (e) {
      throw new Error(e);
    }

    const tenancyOauth2Credential = await con
      .getRepository(TenancyOauth2Credentials)
      .findOne({ integration_type_id: 1 });

    let payload: string;

    if (subDomain === 'localhost') {
      payload = `${tenancy.schema}.${tenancyDomain.description}`;
    } else {
      payload = `${tenancy.schema}.${tenancyDomain.description}`;
    }
    const secret = await this.cryptoService.hashSecret(
      payload,
      this.configService.hashTokenSecret(),
    );

    return new Strategy(
      {
        clientID: tenancyOauth2Credential.client_id,
        clientSecret: tenancyOauth2Credential.client_secret,
        callbackURL: tenancyOauth2Credential.callback_url,
        scope: ['email', 'profile'],
      },
      (
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback,
      ) => {
        const { name, emails, photos } = profile;
        const user = {
          email: emails[0].value,
          name: `${name.givenName} ${name.familyName}`,
          picture: photos[0].value,
          accessToken,
          origin: 'google',
          secret: secret,
          frontEndUrl: tenancyDomain.description,
        };

        serializeUser((user, done) => {
          done(null, user);
        });

        deserializeUser((user, done) => {
          done(null, user);
        });

        done(null, user);
      },
    );
  }

  async googleLogin(user, hostname: string) {
    if (!user) {
      throw new ForbiddenException({ message: 'No user from google' });
    }
    return await this.loginEmail(user, hostname).then((result) => result);
  }

  async loginEmail(data: any, hostname: string) {
    return new Promise(async (resolve) => {
      const tenancyDomain = await this.connection
        .getRepository(TenancyDomains)
        .findOne({ description: hostname });

      const tenancy = await this.connection
        .getRepository(Tenancies)
        .findOne({ id: tenancyDomain.tenancy_id });

      let con = null;
      try {
        const connectionName = `tenant_${tenancy.schema}`;
        const connectionManager = await getConnectionManager();
        if (connectionManager.has(connectionName)) {
          const connection = await connectionManager.get(connectionName);
          con = connection.isConnected ? connection : connection.connect();
        } else {
          con = await createConnection({
            type: 'postgres',
            host: this.configService.hostDatabase(),
            port: this.configService.portDatabase(),
            username: this.configService.userDatabase(),
            password: this.configService.passDatabase(),
            database: this.configService.nameDatabase(),
            migrationsTableName: 'migrations_registers',
            migrations: [__dirname + '/../../migrations/tenancy/*{.ts,.js}'],
            cli: { migrationsDir: __dirname + '/../../migrations/tenancy' },
            entities: [__dirname + '/../../api/**/*.entity{.ts,.js}'],
            synchronize: false,
            name: `tenant_${tenancy.schema}`,
            schema: tenancy.schema,
          });
        }
      } catch (e) {
        throw new Error(e);
      }

      const dataUser = await con
        .getRepository(Users)
        .findOne({ email: data.email });
      if (dataUser) {
        const payload = {
          id: dataUser.id,
          email: dataUser.email,
          name: dataUser.name,
        };
        const token = await this.tokenService
          .createTokenKey(payload, DEFAULT_TIME_TOKEN_AUTH, data.secret)
          .then((res) => res);

        resolve({ token, new: false });
      } else {
        const user: Partial<Users> = {
          name: data.name,
          email: data.email,
          origin: data.origin,
          password: '',
          theme_id: THEME_DEFAULT_ID,
          active: true,
        };
        const savedUser = await con.getRepository(Users).save(user);

        if (savedUser) {
          const usersRoles: Partial<UsersRoles> = {
            user_id: savedUser.id,
            rol_id: 3,
            default: true,
            active: true,
          };
          await con.getRepository(UsersRoles).save(usersRoles);
        }

        const payload = {
          id: savedUser.id,
          email: savedUser.email,
          name: savedUser.name,
        };
        const token = await this.tokenService
          .createTokenKey(payload, DEFAULT_TIME_TOKEN_AUTH, data.secret)
          .then((res) => res);

        resolve({ token, new: true });
      }
    });
  }
}
