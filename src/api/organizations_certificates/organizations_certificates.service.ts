import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  CreateOrganizationsCertificatesDto,
  UpdateOrganizationsCertificatesDto,
  ORGANIZATIONS_CERTIFICATES_PROVIDER,
} from './organizations_certificates.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { OrganizationsCertificates } from './organizations_certificates.entity';
import { AwsService } from './../../aws/aws.service';
import * as shortid from 'shortid';
import { typeFilesAwsNames } from './../../aws/aws.dto';

@Injectable()
export class OrganizationsCertificatesService extends BaseService<
  OrganizationsCertificates,
  CreateOrganizationsCertificatesDto,
  UpdateOrganizationsCertificatesDto
> {
  @Inject(ORGANIZATIONS_CERTIFICATES_PROVIDER)
  repository: BaseRepo<OrganizationsCertificates>;

  constructor(private awsService: AwsService) {
    super();
  }

  async findOne(id: number): Promise<OrganizationsCertificates> {
    const result = await this.repository.findOneOrFail(id);
    if (result.background) {
      result.background = await this.awsService.getFile(result.background);
    }
    if (result.background_demo) {
      result.background_demo = await this.awsService.getFile(
        result.background_demo,
      );
    }
    if (result.sign_picture) {
      result.sign_picture = await this.awsService.getFile(result.sign_picture);
    }
    return result;
  }

  async findSelected(organization_id: number) {
    const result = await this.repository
      .findOneOrFail({
        where: {
          organization_id,
          selected: true,
        },
      })
      .catch(() => {
        throw new InternalServerErrorException(
          'NOT FOUND RESOURCES TO CERTIFICATE',
        );
      });
    if (result.background) {
      result.background = await this.awsService.getFileBase64(
        result.background,
      );
    }
    if (result.background_demo) {
      result.background_demo = await this.awsService.getFileBase64(
        result.background_demo,
      );
    }
    if (result.sign_picture) {
      result.sign_picture = await this.awsService.getFileBase64(
        result.sign_picture,
      );
    }
    return result;
  }

  async create(createDto: CreateOrganizationsCertificatesDto) {
    const data: any = Object.assign({}, createDto);
    if (createDto.background) {
      data.background = await this.setFile(createDto.background);
    }
    if (createDto.background_demo) {
      data.background_demo = await this.setFile(createDto.background_demo);
    }
    if (createDto.sign_picture) {
      data.sign_picture = await this.setFile(createDto.sign_picture);
    }
    const result = await this.repository.save(data);
    return result;
  }

  async update(id: number, updateDto: UpdateOrganizationsCertificatesDto) {
    const data: any = Object.assign({}, updateDto);
    if (updateDto.background) {
      data.background = await this.setFile(updateDto.background);
    }
    if (updateDto.background_demo) {
      data.background_demo = await this.setFile(updateDto.background_demo);
    }
    if (updateDto.sign_picture) {
      data.sign_picture = await this.setFile(updateDto.sign_picture);
    }
    const result = await this.repository.update(id, data);
    return result;
  }

  async setFile(file) {
    const result = await this.awsService.saveFile({
      file,
      name: shortid.generate(),
      type: typeFilesAwsNames.organizations_certificates_resources,
    });
    return result.Key;
  }
}
