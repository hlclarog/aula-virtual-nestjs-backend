import { Inject, Injectable } from '@nestjs/common';
import { BaseService } from '../../base/base.service';
import { ProgramInterestAreas } from './program_interest_areas.entity';
import { BaseRepo } from '../../base/base.repository';
import {
  CreateProgramInterestAreasDto,
  PROGRAM_INTEREST_AREAS_PROVIDER,
  UpdateProgramInterestAreasDto,
} from './program_interest_areas.dto';

@Injectable()
export class ProgramInterestAreasService extends BaseService<
  ProgramInterestAreas,
  CreateProgramInterestAreasDto,
  UpdateProgramInterestAreasDto
> {
  @Inject(PROGRAM_INTEREST_AREAS_PROVIDER)
  repository: BaseRepo<ProgramInterestAreas>;

  async findByProgram(id: number): Promise<ProgramInterestAreas[]> {
    return await this.repository.find({
      where: { program_id: id },
    });
  }

  async set(idProgram: number, areas: Array<number>): Promise<any> {
    const areasList = areas.length > 0 ? areas.join() : [0].join();
    // DELETE ITEMS NOT RECEIVED
    await this.repository
      .createQueryBuilder()
      .delete()
      .from(ProgramInterestAreas)
      .where(
        `program_id = :idProgram and interest_area_id not in (${areasList})`,
        {
          idProgram,
        },
      )
      .execute();
    // SEARCH ITEMS ACTUALS FOR NO DUPLICATE
    const founds = await this.repository
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.interest_area', 'interest_area')
      .where(
        `item.program_id = :idProgram and item.interest_area_id in (${areasList})`,
        {
          idProgram,
        },
      )
      .getMany();
    // SAVE ITEMS NEWS
    const values: any[] = areas.map((idArea) => {
      return { program_id: idProgram, interest_area_id: idArea };
    });
    await this.repository
      .createQueryBuilder()
      .insert()
      .into(ProgramInterestAreas)
      .values(
        values.filter((v) =>
          founds
            .map((f: any) => f.interest_area.id)
            .indexOf(v.interest_area_id) >= 0
            ? false
            : true,
        ),
      )
      .execute();
    return { update: true };
  }
}
