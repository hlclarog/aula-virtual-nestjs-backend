import { Module } from '@nestjs/common';
import { OrganizationsCertificatesService } from './organizations_certificates.service';
import { OrganizationsCertificatesController } from './organizations_certificates.controller';
import { DATABASE_TENANCY_PROVIDER } from '../../database/database.dto';
import { Connection } from 'typeorm';
import { ORGANIZATIONS_CERTIFICATES_PROVIDER } from './organizations_certificates.dto';
import { OrganizationsCertificates } from './organizations_certificates.entity';
import { AwsModule } from './../../aws/aws.module';

@Module({
  imports: [AwsModule],
  controllers: [OrganizationsCertificatesController],
  providers: [
    {
      provide: ORGANIZATIONS_CERTIFICATES_PROVIDER,
      inject: [DATABASE_TENANCY_PROVIDER],
      useFactory: (connection: Connection) =>
        connection.getRepository(OrganizationsCertificates),
    },
    OrganizationsCertificatesService,
  ],
  exports: [
    ORGANIZATIONS_CERTIFICATES_PROVIDER,
    OrganizationsCertificatesService,
  ],
})
export class OrganizationsCertificatesModule {}
