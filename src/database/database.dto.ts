import { applyDecorators, Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';

export const DATABASE_MANAGER_PROVIDER = 'DATABASE_CONNECTION';
export const DATABASE_TENANCY_PROVIDER = 'TENANCY_CONNECTION';

export const NO_FOUND_CLIENT = 'NOT FOUND DATA OF CLIENT';

export const NAME_HEADER_CLIENT = 'x-mangus-client';

export function ControllerApi(name) {
  return applyDecorators(
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
