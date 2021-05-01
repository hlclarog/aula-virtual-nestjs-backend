import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  CreateCertificatesDemoDto,
  CreateCertificatesDto,
  ORGANIZATIONS_PROVIDER,
  TypesCertificates,
} from './certificates.dto';
import { BaseService } from '../../base/base.service';
import { BaseRepo } from '../../base/base.repository';
import { Certificates } from './certificates.entity';
import { OrganizationsCertificatesService } from '../organizations_certificates/organizations_certificates.service';
import { LessonsService } from '../lessons/lessons.service';
import {
  INFO_USER_PROVIDER,
  InfoUserProvider,
} from './../../utils/providers/info-user.module';
import { ProgramsService } from '../programs/programs.service';
import { ProgramCoursesService } from '../program_courses/program_courses.service';
import { Courses } from '../courses/courses.entity';
import { generateFile as generateFileFromHtml } from './../../utils/pdfhtml/pdfhtml.generator';
import { AwsService } from './../../aws/aws.service';
import { typeFilesAwsNames } from './../../aws/aws.dto';
import * as shortid from 'shortid';
import { UsersService } from '../acl/users/users.service';
import { ProgramUsersService } from '../program_users/program_users.service';
import { CourseUsersService } from '../course-users/course-users.service';
import { getActualDateFormat } from './../../utils/date';
import { timeConvert } from './../../utils/helper';
import { generateContent } from './certificates.generate_pdf';
import { Users } from '../acl/users/users.entity';
import { OrganizationsCertificates } from '../organizations_certificates/organizations_certificates.entity';

@Injectable()
export class CertificatesService extends BaseService<
  Certificates,
  CreateCertificatesDto,
  null
> {
  @Inject(ORGANIZATIONS_PROVIDER) repository: BaseRepo<Certificates>;

  constructor(
    @Inject(INFO_USER_PROVIDER) private infoUser: InfoUserProvider,
    private organizationsCertificatesService: OrganizationsCertificatesService,
    private lessonsService: LessonsService,
    private programsService: ProgramsService,
    private programCoursesService: ProgramCoursesService,
    private awsService: AwsService,
    private usersService: UsersService,
    private programUsersService: ProgramUsersService,
    private courseUsersService: CourseUsersService,
  ) {
    super();
  }

  async findOne(id) {
    const result = await this.repository.findOneOrFail(id);
    if (result.link) {
      result.link = await this.awsService.getFile(result.link);
    }
    return result;
  }

  async generate(createDto: CreateCertificatesDto) {
    const certificateResources = await this.organizationsCertificatesService.findSelected(
      createDto.organization_id,
    );
    const userData = await this.usersService.findOne(this.infoUser.id);
    const dataCertificate = await this.createCertificate(
      createDto.reference_id,
      createDto.reference_type,
      certificateResources,
      userData,
      false,
    );
    if (dataCertificate.validToGenerate) {
      const filePdfAws = await this.saveCertificate(
        dataCertificate.dataPdf,
        dataCertificate.originFolderCertificate,
      );
      const result = await this.repository.save({
        organization_certificate_id: certificateResources.id,
        reference_type: createDto.reference_type,
        reference_id: createDto.reference_id,
        certification_validate_code: createDto.certification_validate_code,
        link: filePdfAws,
      });
      switch (createDto.reference_type) {
        case TypesCertificates.COURSE:
          await this.courseUsersService.setCertficate(
            this.infoUser.id,
            createDto.reference_id,
            result.id,
          );
          break;
        case TypesCertificates.PROGRAM:
          await this.programUsersService.setCertficate(
            this.infoUser.id,
            createDto.reference_id,
            result.id,
          );
          break;
      }
      if (result.link) {
        result.link = await this.awsService.getFile(result.link);
      }
      return { data: result };
    } else {
      switch (createDto.reference_type) {
        case TypesCertificates.COURSE:
          throw new InternalServerErrorException('COURSE INCOMPLETE');
          break;
        case TypesCertificates.PROGRAM:
          throw new InternalServerErrorException('PROGRAM INCOMPLETE');
          break;
      }
    }
  }

  async generateDemo(createDto: CreateCertificatesDemoDto) {
    const certificateResources = await this.organizationsCertificatesService.findSelected(
      createDto.organization_id,
    );
    const userData = await this.usersService.findOne(this.infoUser.id);
    const result = await this.createCertificate(
      createDto.reference_id,
      createDto.reference_type,
      certificateResources,
      userData,
      true,
    );
    return result;
  }

  async createCertificate(
    reference_id: number,
    reference_type: string,
    certificateResources: OrganizationsCertificates,
    userData: Users,
    demo: boolean,
  ) {
    let dataProgress: Courses[];
    let dataFormat = null;
    let validToGenerate = false;
    let originFolderCertificate = '';
    switch (reference_type) {
      case TypesCertificates.COURSE:
        dataProgress = await this.lessonsService.findProgessByCourse(
          [reference_id],
          this.infoUser.id,
        );
        dataFormat = generateContent(
          certificateResources.content,
          demo
            ? certificateResources.background_demo
            : certificateResources.background,
          {
            STUDENT_IDENTIFICATION: userData.identification,
            STUDENT_NAME: `${userData.name} ${userData.lastname}`,
            CERTIFICATE_TITLE: dataProgress[0].name,
            CERTIFICATE_TYPE: 'curso',
            DATE: getActualDateFormat(),
            CITY: userData.city,
            DURATION: timeConvert(dataProgress[0]['duration']),
            SIGN_PICTURE: certificateResources.sign_picture,
            SIGN_TEXT: certificateResources.sign_text,
          },
        );
        if (dataProgress[0]['progress'] == 100) {
          validToGenerate = true;
          originFolderCertificate = typeFilesAwsNames.courses_certificates;
        }
        break;
      case TypesCertificates.PROGRAM:
        const dataProgramCourses = await this.programCoursesService.findByProgram(
          reference_id,
        );
        dataProgress = await this.lessonsService.findProgessByCourse(
          dataProgramCourses.map((r) => r.course_id),
          this.infoUser.id,
        );
        const dataProgram = await this.programsService.findOne(reference_id);
        const courses_finlaized = dataProgress.filter(
          (d) => d['progress'] == 100,
        ).length;
        const certifiable_number = dataProgram.certifiable_number
          ? dataProgram.certifiable_number
          : 0;
        if (Number(courses_finlaized) >= Number(certifiable_number)) {
          validToGenerate = true;
          originFolderCertificate = typeFilesAwsNames.programs_certificates;
        }
        dataFormat = generateContent(
          certificateResources.content,
          demo
            ? certificateResources.background_demo
            : certificateResources.background,
          {
            STUDENT_IDENTIFICATION: userData.identification,
            STUDENT_NAME: `${userData.name} ${userData.lastname}`,
            CERTIFICATE_TITLE: dataProgram.name,
            CERTIFICATE_TYPE: 'programa',
            DATE: getActualDateFormat(),
            CITY: userData.city,
            DURATION: timeConvert(
              dataProgress.map((c) => c['duration']).reduce((a, b) => a + b),
            ),
            SIGN_PICTURE: certificateResources.sign_picture,
            SIGN_TEXT: certificateResources.sign_text,
          },
        );
        break;
    }
    const certificatePdf = await generateFileFromHtml(
      dataFormat.content,
      dataFormat.options,
    );
    return {
      dataPdf: certificatePdf,
      validToGenerate,
      originFolderCertificate,
    };
  }

  async saveCertificate(file, type) {
    const result = await this.awsService.saveFile({
      file,
      name: shortid.generate(),
      type,
    });
    return result.Key;
  }
}
