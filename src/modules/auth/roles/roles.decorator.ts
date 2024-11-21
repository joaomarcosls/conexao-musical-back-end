import { SetMetadata } from '@nestjs/common';
import { Role } from '../../usuarios/enum/usuario-roles.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
