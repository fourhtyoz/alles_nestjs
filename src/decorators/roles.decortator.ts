import { Reflector } from '@nestjs/core';
import { Role } from 'src/modules/auth/roles.enum';

export const Roles = Reflector.createDecorator<Role[]>();
