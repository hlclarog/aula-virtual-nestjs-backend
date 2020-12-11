import { Inject, Injectable } from '@nestjs/common';
import { CreateRolesDto, UpdateRolesDto, ROLES_PROVIDER } from './roles.dto';
import { BaseService } from '../../../base/base.service';
import { BaseRepo } from '../../../base/base-repo';
import { Roles } from './roles.entity';
import { UpdateResult } from 'typeorm';
import { RolesPermissionsService } from '../roles_permissions/roles_permissions.service';

@Injectable()
export class RolesService extends BaseService<
  Roles,
  CreateRolesDto,
  UpdateRolesDto
> {
  @Inject(ROLES_PROVIDER) repository: BaseRepo<Roles>;

  constructor(private rolesPermissionsService: RolesPermissionsService) {
    super();
  }

  async findAll(): Promise<Roles[]> {
    return await this.repository.find({
      relations: ['permissions'],
    });
  }

  async findOne(id: number): Promise<Roles> {
    return this.repository.findOneOrFail(id, {
      relations: ['permissions'],
    });
  }

  async create(createDto: CreateRolesDto) {
    const data: any = Object.assign({}, createDto);
    delete data.permissions;
    const dataNew = await this.repository.save(data);
    await this.rolesPermissionsService.set(dataNew.id, createDto.permissions);
    return dataNew;
  }

  async update(id: number, updateDto: UpdateRolesDto): Promise<UpdateResult> {
    const data: any = Object.assign({}, updateDto);
    delete data.permissions;
    await this.rolesPermissionsService.set(id, updateDto.permissions);
    return await this.repository.update(id, data);
  }
}
