import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import {
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
import { generateFile } from './../../utils/pdfmake/pdfmake.generator';
import { AwsService } from './../../aws/aws.service';
import { typeFilesAwsNames } from './../../aws/aws.dto';
import * as shortid from 'shortid';
import { UsersService } from '../acl/users/users.service';
import { ProgramUsersService } from '../program_users/program_users.service';
import { CourseUsersService } from '../course-users/course-users.service';

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
    const cerficiateResources = await this.organizationsCertificatesService.findSelected(
      createDto.organization_id,
    );
    const userData = await this.usersService.findOne(this.infoUser.id);
    let dataProgress: Courses[];
    let validToGenerate = false;
    let originFolderCertificate = null;
    let dataContentPdf = {};
    switch (createDto.reference_type) {
      case TypesCertificates.COURSE:
        dataProgress = await this.lessonsService.findProgessByCourse(
          [createDto.reference_id],
          this.infoUser.id,
        );
        if (dataProgress[0]['progress'] == 100) {
          validToGenerate = true;
          originFolderCertificate = typeFilesAwsNames.courses_certificates;
          dataContentPdf = {
            content: [
              `Felicidades ${userData.name} ${userData.lastname}`,
              `Mediante la presente se le certfica que cumplio con lo necesario para obtener su certficado en ${dataProgress[0].name}`,
            ],
          };
        }
        break;
      case TypesCertificates.PROGRAM:
        const dataProgram = await this.programsService.findOne(
          createDto.reference_id,
        );
        const dataProgramCourses = await this.programCoursesService.findByProgram(
          createDto.reference_id,
        );
        dataProgress = await this.lessonsService.findProgessByCourse(
          dataProgramCourses.map((r) => r.course_id),
          this.infoUser.id,
        );
        const courses_finlaized = dataProgress.filter(
          (d) => d['progress'] == 100,
        ).length;
        const certifiable_number = dataProgram.certifiable_number
          ? dataProgram.certifiable_number
          : 0;
        if (Number(courses_finlaized) >= Number(certifiable_number)) {
          validToGenerate = true;
          originFolderCertificate = typeFilesAwsNames.programs_certificates;
          dataContentPdf = {
            content: [
              `Felicidades ${userData.name} ${userData.lastname}`,
              `Mediante la presente se le certfica que cumplio con lo necesario para obtener su certficado en ${dataProgram.name}`,
            ],
          };
        }
        break;
    }
    if (validToGenerate) {
      const certificatePdf = await generateFile(dataContentPdf, {});
      const filePdfAws = await this.saveCertificate(
        certificatePdf,
        originFolderCertificate,
      );
      const result = await this.repository.save({
        organization_certificate_id: cerficiateResources.id,
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
      return result;
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

  async saveCertificate(file, type) {
    const result = await this.awsService.saveFile({
      file,
      name: shortid.generate(),
      type,
    });
    return result.Key;
  }
}
