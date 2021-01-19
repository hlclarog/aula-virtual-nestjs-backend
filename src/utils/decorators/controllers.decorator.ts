import { applyDecorators, Controller, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NAME_HEADER_CLIENT } from '../../database/database.dto';
import { PermissionsGuard } from '../guards/permissions.guard';

export function ControllerApi({ name }) {
  return applyDecorators(
    UseGuards(PermissionsGuard),
    ApiBearerAuth(),
    ApiTags(name),
    Controller(`/api/${name}`),
    ApiHeader({
      name: NAME_HEADER_CLIENT,
      description: 'Url client',
      required: false,
      example: 'localhost',
    }),
  );
}
export function ControllerAuth({ name }) {
  return applyDecorators(
    ApiTags('auth'),
    Controller(`/auth${name ? `/${name}` : ''}`),
    ApiHeader({
      name: NAME_HEADER_CLIENT,
      description: 'Url client',
      required: false,
      example: 'localhost',
    }),
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
