import { Get, Inject } from '@nestjs/common';
import {
  DATABASE_MANAGER_PROVIDER,
  DATABASE_MANUAL_PROVIDER,
} from '../database/database.dto';
import { Connection } from 'typeorm';
import { ControllerMigrations } from '../utils/decorators/controllers.decorator';

@ControllerMigrations({ name: '' })
export class MigrationsController {
  @Inject(DATABASE_MANUAL_PROVIDER) connection: Connection;
  @Inject(DATABASE_MANAGER_PROVIDER) connectionPublic: Connection;

  constructor() {}

  @Get('public/run')
  async runPublic() {
    await this.connectionPublic.runMigrations();
    return { message: 'Migrations public running' };
  }

  @Get('public/undoLastMigration')
  async undoLastMigrationPublic() {
    await this.connectionPublic.undoLastMigration();
    return { message: 'undoLastMigration public running' };
  }

  @Get('tenancy/run')
  async run() {
    await this.connection.runMigrations();
    return { message: 'Migrations tenancy running' };
  }

  @Get('tenancy/undoLastMigration')
  async undoLastMigration() {
    await this.connection.undoLastMigration();
    return { message: 'undoLastMigration tenancy running' };
  }

  @Get('verify')
  async verify() {
    return { data: await this.connection.showMigrations() };
  }
}
