import { SetMetadata } from '@nestjs/common';
import { KeyPermissions } from '../guards/permissions.guard';

export const RequirePermissions = (permissions: string[]) =>
  SetMetadata(KeyPermissions, permissions);
