import { Inject, Injectable } from '@nestjs/common';
import { IpayuConfirmation, IPayuResponse } from './payment.dto';
import { TenancyDomains } from '../api/tenancy_domains/tenancy_domains.entity';
import { DATABASE_MANAGER_PROVIDER } from '../database/database.dto';
import { Connection, createConnection, getConnectionManager } from 'typeorm';
import { ConfigService } from '../config/config.service';
import { Payments } from '../api/payments/payments.entity';
import {
  PAYMENT_STATUS_ENUM,
  TRANSACTION_STATE_ENUM,
} from '../api/payment_status/payment_status.dto';
import { CoursePayments } from '../api/course_payments/course_payments.entity';
import { CourseUsers } from '../api/course-users/course-users.entity';
import { ENROLLMENT_TYPE } from '../api/enrollment-types/enrollment-types.dto';

@Injectable()
export class PaymentService {
  @Inject(DATABASE_MANAGER_PROVIDER) connection: Connection;

  constructor(private configService: ConfigService) {}
  async createConnection(subDomain: string) {
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
        con = (await connection.isConnected)
          ? connection
          : connection.connect();
      } else {
        con = await createConnection({
          type: 'postgres',
          host: this.configService.hostDatabase(),
          port: this.configService.portDatabase(),
          username: this.configService.userDatabase(),
          password: this.configService.passDatabase(),
          database: this.configService.nameDatabase(),
          migrationsTableName: 'migrations_registers',
          migrations: [__dirname + '/../migrations/tenancy/*{.ts,.js}'],
          cli: { migrationsDir: __dirname + '/../../migrations/tenancy' },
          entities: [__dirname + '/../api/**/*.entity{.ts,.js}'],
          synchronize: false,
          name: `tenant_${tenancyDomain.tenancy.schema}`,
          schema: tenancyDomain.tenancy.schema,
        });
      }
    } catch (e) {
      throw new Error(e);
    }
    return con;
  }

  getPaymentResponse(transactionState) {
    let paymentStateId;
    switch (transactionState) {
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
    return paymentStateId;
  }

  async payuResponse(input: IPayuResponse, subDomain: string) {
    const con = await this.createConnection(subDomain);
    const payments = await con
      .getRepository(Payments)
      .findOne({ transaction_reference: input.referenceCode });

    await con.getRepository(Payments).update(payments.id, {
      payment_state_id: this.getPaymentResponse(input.transactionState),
      processed_date: input.processingDate,
      transaction_code: input.transactionId,
    });
  }

  async payuConfirmation(input: IpayuConfirmation, subDomain: string) {
    const con = await this.createConnection(subDomain);
    const pay: Payments = await
      con
      .getRepository(Payments)
      .findOne({
      transaction_reference: input.reference_sale,
    });
    con.getRepository(Payments).update(pay.id, {
      payment_state_id: this.getPaymentResponse(input.state_pol),
      processed_date: input.date,
      transaction_code: input.transaction_id,
      snapshot: JSON.stringify(input),
    });
    if (input.state_pol === '4') {
      const references_code = pay.transaction_reference.split('-');
      switch (references_code[0]) {
        case 'COURSE':
          this.createEnrollmentToCourse(con, pay);
          break;
        case 'CERTIFICATE':
          break;
      }
    }
  }

  async createEnrollmentToCourse(con: any, pay: Payments) {
    const result = await con
      .createQueryBuilder()
      .insert()
      .into(CourseUsers)
      .values([
        {
          course_id: pay.course_payment.course_id,
          user_id: pay.course_payment.user_id,
          enrollment_status_id: 1,
          enrollment_type_id: ENROLLMENT_TYPE.CURSO,
          begin_date: new Date(Date.now()).toLocaleDateString(
            'zh-Hans-CN',
          )
        },
      ])
      .execute();

    // EJECUTAR JOB PARA ENVIAR NOTIFICACION DE MATRICULA
  }
  generateCertificate() {}
}
