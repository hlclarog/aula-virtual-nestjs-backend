import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';

export type EnvConfig = Record<string, any>;

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = ConfigService.validateInput(config);
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  hostDatabase(): string {
    return this.envConfig.DATABASE_HOST;
  }
  nameDatabase(): string {
    return this.envConfig.DATABASE_NAME;
  }
  portDatabase(): number {
    return this.envConfig.DATABASE_PORT;
  }
  userDatabase(): string {
    return this.envConfig.DATABASE_USER;
  }
  passDatabase(): string {
    return this.envConfig.DATABASE_PASS;
  }
  isDevelopment(): string {
    return this.envConfig.DEVELOPMENT;
  }
  hashTokenSecret(): string {
    return this.envConfig.TOKEN_SECRET;
  }
  hashTokenSecretPasswordReq(): string {
    return this.envConfig.TOKEN_SECRET_PASSWORDSREQ;
  }
  portApi(): number {
    return this.envConfig.PORT;
  }
  portSocket(): number {
    return this.envConfig.SOCKET;
  }
  hostMongo(): string {
    return this.envConfig.MONGO_HOST;
  }
  dbMongo(): string {
    return this.envConfig.MONGO_DB;
  }
  portMongo(): number {
    return this.envConfig.MONGO_PORT;
  }
  urlBackend(): string {
    return this.envConfig.URL_BACKEND;
  }
  getAwsAccesKey(): string {
    return this.envConfig.AWS_ACCESS_KEY_ID;
  }
  getAwsSecretKey(): string {
    return this.envConfig.AWS_SECRET_ACCESS_KEY;
  }

  private static validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      DATABASE_HOST: Joi.string().required(),
      DATABASE_NAME: Joi.string().required(),
      DATABASE_PORT: Joi.number().required(),
      DATABASE_USER: Joi.string().required(),
      DATABASE_PASS: Joi.string().required(),
      MONGO_HOST: Joi.string().required(),
      MONGO_DB: Joi.string().required(),
      MONGO_PORT: Joi.number().required(),
      TOKEN_SECRET: Joi.string().required(),
      TOKEN_SECRET_PASSWORDSREQ: Joi.string().required(),
      PORT: Joi.number().required(),
      QUEUE_HOST: Joi.string().required(),
      QUEUE_PORT: Joi.string().required(),
      SOCKET: Joi.number().required(),
      URL_BACKEND: Joi.string().required(),
      AWS_ACCESS_KEY_ID: Joi.string().required(),
      AWS_SECRET_ACCESS_KEY: Joi.string().required(),
    });
    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      envConfig,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }
}
