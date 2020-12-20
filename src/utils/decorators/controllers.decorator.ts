import { applyDecorators, Controller, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NAME_HEADER_CLIENT } from './../../database/database.dto';
import { PermissionsGuard } from './../guards/permissions.guard';

export function ControllerApi({ name }) {
  return applyDecorators(
    UseGuards(PermissionsGuard),
    ApiHeader({
      name: NAME_HEADER_CLIENT,
      description: 'Code of tenancy',
      required: true,
    }),
    ApiBearerAuth(),
    ApiTags(name),
    Controller(`/api/${name}`),
  );
}
export function ControllerAuth({ name }) {
  return applyDecorators(
    ApiHeader({
      name: NAME_HEADER_CLIENT,
      description: 'Code of tenancy',
      required: true,
    }),
    ApiTags('auth'),
    Controller(`/auth${name ? `/${name}` : ''}`),
  );
}
export function ControllerMigrations({ name }) {
  return applyDecorators(
    ApiHeader({
      name: NAME_HEADER_CLIENT,
      description: 'Code of tenancy',
      required: true,
    }),
    ApiTags('migrations'),
    Controller(`/migrations${name ? `/${name}` : ''}`),
  );
}
