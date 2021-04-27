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
  ) {
    super();
  }

  async generate(createDto: CreateCertificatesDto) {
    const cerficiateResources = await this.organizationsCertificatesService.findSelected(
      createDto.organization_id,
    );
    let dataProgress: Courses[];
    let validToGenerate = false;
    switch (createDto.reference_type) {
      case TypesCertificates.COURSE:
        dataProgress = await this.lessonsService.findProgessByCourse(
          [createDto.reference_id],
          this.infoUser.id,
        );
        if (dataProgress[0]['progress'] == 100) {
          validToGenerate = true;
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
        }
        break;
    }
    if (validToGenerate) {
      const link = null;
      const result = await this.repository.save({
        organization_certificate_id: cerficiateResources.id,
        reference_type: createDto.reference_type,
        reference_id: createDto.reference_id,
        certification_validate_code: createDto.certification_validate_code,
        link,
      });
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
}
