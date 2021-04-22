import { Inject, Injectable } from '@nestjs/common';
import { IPayuResponse } from './payment.dto';
import { TenancyDomains } from '../api/tenancy_domains/tenancy_domains.entity';
import { DATABASE_MANAGER_PROVIDER } from '../database/database.dto';
import { Connection, createConnection, getConnectionManager } from 'typeorm';
import { ConfigService } from '../config/config.service';
import { Payments } from '../api/payments/payments.entity';
import {
  PAYMENT_STATUS_ENUM,
  TRANSACTION_STATE_ENUM,
} from '../api/payment_status/payment_status.dto';

@Injectable()
export class PaymentService {
  @Inject(DATABASE_MANAGER_PROVIDER) connection: Connection;

  constructor(private configService: ConfigService) {}

  async payuResponse(input: IPayuResponse, subDomain: string) {
    const tenancyDomain = await this.connection
      .getRepository(TenancyDomains)
      .findOne({
        relations: ['tenancy'],
        where: {
          description:
            subDomain === 'localhost' ? subDomain : `${subDomain}.omarenco.com`,
        },
      });

    let con = null;
    try {
      const connectionName = `tenant_${tenancyDomain.tenancy.schema}`;
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
          name: `tenant_${tenancyDomain.tenancy.schema}`,
          schema: tenancyDomain.tenancy.schema,
        });
      }
    } catch (e) {
      throw new Error(e);
    }

    const payments = await con
      .getRepository(Payments)
      .findOne({ transaction_reference: input.referenceCode });

    let paymentStateId;
    switch (input.transactionState) {
      case TRANSACTION_STATE_ENUM.APPROVED:
        paymentStateId = PAYMENT_STATUS_ENUM.APPROVED;
        break;
      case TRANSACTION_STATE_ENUM.REJECTED:
        paymentStateId = PAYMENT_STATUS_ENUM.REJECTED;
        break;
      case TRANSACTION_STATE_ENUM.PENDING:
        paymentStateId = PAYMENT_STATUS_ENUM.PENDING;
        break;
      case TRANSACTION_STATE_ENUM.ERROR:
        paymentStateId = PAYMENT_STATUS_ENUM.ERROR;
        break;
    }
    await con.getRepository(Payments).update(payments.id, {
      payment_state_id: paymentStateId,
      processed_date: input.processingDate,
      transaction_code: input.transactionId,
    });
  }
}