import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';

export type EnvConfig = Record<string, any>;

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  hostDatabase(): string { return this.envConfig.DATABASE_HOST; }
  nameDatabase(): string { return this.envConfig.DATABASE_NAME; }
  portDatabase(): number { return this.envConfig.DATABASE_PORT; }
  userDatabase(): string { return this.envConfig.DATABASE_USER; }
  passDatabase(): string { return this.envConfig.DATABASE_PASS; }
  isDevelopment(): string { return this.envConfig.DEVELOPMENT; }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      DATABASE_HOST: Joi.string().required(),
      DATABASE_NAME: Joi.string().required(),
      DATABASE_PORT: Joi.number().required(),
      DATABASE_USER: Joi.string().required(),
      DATABASE_PASS: Joi.string().required(),
      PORT: Joi.string().required(),
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